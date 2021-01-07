import * as ServiceModule from '../../src/Interface/Service'

jest.mock('../../src/Utils/FormatRequest')
import { formatRequest, RequestForm } from '../../src/Utils/FormatRequest'

import * as Util from '../../src/Utils/Util'
// @ts-expect-error
// eslint-disable-next-line no-import-assign
Util.assert = jest.fn()

function find_duplicates_in_array(array: any[]) {
  var object = {} as Record<string, any>
  var result = []

  array.forEach((item) => {
    if (!object[item]) object[item] = 0
    object[item]++
  })

  for (var prop in object) {
    if (object[prop] >= 2) {
      result.push(prop)
    }
  }

  return result
}

describe('Service module', () => {
  describe('Service class', () => {
    const { Service } = ServiceModule

    describe('constructor', () => {
      it('should set the token', () => {
        const s = new Service('abc')
        expect(s.token).toBe('abc')
      })
    })

    describe('get method', () => {
      it('should return null when no valid key is used', () => {
        // @ts-expect-error
        expect(Service.get()).toBeNull()
        // @ts-expect-error
        expect(Service.get({})).toBeNull()
        expect(Service.get('')).toBeNull()
        expect(
          Service.get('some_invalid_alias_no_service_will_ever_have')
        ).toBeNull()
      })

      it('should return a class when the a valid alias is used', () => {
        expect(Service.get('top.gg')).toEqual(expect.any(Function))
      })

      it('should account for extra services', () => {
        // @ts-expect-error
        const CustomService = class extends Service {
          static get aliases() {
            return ['some_invalid_alias_no_service_will_ever_have']
          }
          static post: () => {}
        }
        expect(
          Service.get('some_invalid_alias_no_service_will_ever_have', [
            CustomService
          ])
        ).toEqual(expect.any(Function))
      })
    })

    describe('getAll method', () => {
      it('should return an array of Service classes', () => {
        const serviceClasses = Service.getAll()
        expect(typeof serviceClasses).toBe('object')
        Object.entries(serviceClasses).forEach(([key, value]) => {
          expect(typeof key).toBe('string')
          expect(value).toEqual(expect.any(Function))
          expect(value.prototype).toEqual(expect.any(Service))
        })
      })

      test('the aliases and names of classes cannot be duplicate', () => {
        const everyAlias = ([] as string[]).concat(
          ...Object.values(Service.getAll()).map((serviceClass) =>
            [...serviceClass.aliases].map((s) => s.toLowerCase())
          )
        )

        const duplicates = find_duplicates_in_array(everyAlias)

        expect(duplicates).toEqual([])
      })
    })

    describe('_post method', () => {
      it('should reject when called on the base', (done) => {
        Service._post({ url: 'abc' })
          .then(() => done.fail())
          .catch(() => done())
      })

      it('should call formatRequest with the given form', async () => {
        class CS extends Service {
          static get serviceName() {
            return 'abc'
          }
          static get baseURL() {
            return 'xyz'
          }
        }
        const req: RequestForm = {
          url: 'abc',
          data: { a: 1 },
          headers: { auth: 'def' },
          method: 'get',
          params: { b: 2, c: false }
        }

        await CS._post(req, false)
        expect(formatRequest).toHaveBeenCalledTimes(1)
        expect(formatRequest).toHaveBeenLastCalledWith(req)
        jest.resetAllMocks()
      })
    })

    describe('_request method', () => {
      afterEach(() => {
        jest.resetAllMocks()
      })

      const req: RequestForm = {
        url: 'abc',
        data: { a: 1 },
        headers: { auth: 'def' },
        method: 'get',
        params: { b: 2, c: false }
      }

      it('should throw if a token is required and none is provided', (done) => {
        // @ts-expect-error
        const s = new Service()

        // @ts-expect-error
        s._request({}, { requiresToken: true })
          .then(() => done.fail('This promise should not resolve'))
          .catch(() => done())
      })

      it('should call formatRequest with the given form', async () => {
        const s = new Service('')
        await s._request(req, { appendBaseURL: false })
        expect(formatRequest).toHaveBeenCalledTimes(1)
        expect(formatRequest).toHaveBeenLastCalledWith(req)
      })

      it('should correctly append the baseURL', async () => {
        class CS extends Service {
          static get baseURL() {
            return 'xyz'
          }
        }

        const s = new CS('')

        await s._request(req)
        expect(formatRequest).toHaveBeenCalledTimes(1)
        expect(formatRequest).toHaveBeenLastCalledWith({
          ...req,
          url: 'xyz' + req.url
        })

        await s._request(req, { appendBaseURL: true })
        expect(formatRequest).toHaveBeenCalledTimes(2)
        expect(formatRequest).toHaveBeenLastCalledWith({
          ...req,
          url: 'xyz' + req.url
        })
      })
    })

    describe('_appendQuery method', () => {
      class CS extends Service {
        static get baseURL() {
          return 'https://abc.xyz'
        }
      }
      const s = new CS('')

      const query = { a: 'A', b: 1, c: true }

      it('should return the same URL when the query is empty', () => {
        const url = 'https://def.ghi'
        expect(s._appendQuery(url, {}, false)).toBe(url)
      })

      it('should correctly add the query', () => {
        expect(s._appendQuery('https://def.ghi', query, false)).toBe(
          'https://def.ghi?a=A&b=1&c=true'
        )
      })

      it('should correctly append the baseURL', () => {
        expect(s._appendQuery('/a/b', query)).toBe(
          'https://abc.xyz/a/b?a=A&b=1&c=true'
        )
        expect(s._appendQuery('/a/b', query, true)).toBe(
          'https://abc.xyz/a/b?a=A&b=1&c=true'
        )
      })
    })

    describe('placeholders', () => {
      test('baseURL should return an empty string', () => {
        expect(Service.baseURL).toBe('')
      })

      test('the other static getters should always throw', () => {
        expect(() => Service.aliases).toThrow()
        expect(() => Service.logoURL).toThrow()
        expect(() => Service.serviceName).toThrow()
        expect(() => Service.websiteURL).toThrow()
      })

      test('post should throw', () => {
        expect(Service.post).toThrow()
      })
    })
  })
})
