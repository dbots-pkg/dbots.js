import * as ServiceModule from '../../src/Interface/Service'

jest.mock('../../src/Utils/FormatRequest')
import { formatRequest, RequestForm } from '../../src/Utils/FormatRequest'

import * as Util from '../../src/Utils/Util'
// @ts-expect-error
// eslint-disable-next-line no-import-assign
Util.assert = jest.fn()

describe('Service module', () => {
  describe('Service class', () => {
    const { Service } = ServiceModule

    describe('constructor', () => {
      it('should set the token', () => {
        const s = new Service('abc')
        expect(s.token).toBe('abc')
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
