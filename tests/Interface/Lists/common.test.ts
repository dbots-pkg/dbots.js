import fs from 'fs'
import path from 'path'
import { Service, ServicePostOptions } from '../../../src/Interface/Service'

const listsDir = path.join(__dirname, '../../../src/Interface/Lists')

fs.readdirSync(listsDir).forEach((file) => {
  const fileName = path.parse(file).name

  describe(`${fileName} module`, () => {
    const List = require(path.join(listsDir, file)).default as typeof Service

    describe(`${fileName} class`, () => {
      describe('static getters', () => {
        test('aliases should be a string[]', () => {
          expect(List.aliases).toBeInstanceOf(Array)
          List.aliases.forEach((alias) => {
            expect(typeof alias).toBe('string')
            expect(!!alias).toBeTruthy()
          })
        })

        test('logoURL should be a string', () => {
          expect(typeof List.logoURL).toBe('string')
          expect(!!List.logoURL).toBeTruthy()
        })

        test('serviceName should be a string', () => {
          expect(typeof List.serviceName).toBe('string')
          expect(!!List.serviceName).toBeTruthy()
        })

        test('websiteURL should be a string', () => {
          expect(typeof List.websiteURL).toBe('string')
          expect(!!List.websiteURL).toBeTruthy()
        })

        test('baseURL should be a string', () => {
          expect(typeof List.baseURL).toBe('string')
          expect(!!List.baseURL).toBeTruthy()
        })
      })

      describe('post static method', () => {
        const opts: ServicePostOptions = {
          clientID: '111111111111111111',
          serverCount: 123,
          token: 'abc',
          userCount: 123,
          shard: {
            count: 123,
            id: 456
          },
          voiceConnections: 123
        }

        it('should call the super._post method', (done) => {
          // @ts-expect-error
          Service._post = jest.fn(async () => {})

          expect(typeof List.post).toBe('function')
          List.post(opts)
            .then(() => {
              expect(Service._post).toHaveBeenCalledTimes(1)
              done()
            })
            .catch((e) => {
              if (e?.message?.includes('does not support posting.')) {
                done()
              } else done.fail(e)
            })
        })
      })
    })
  })
})
