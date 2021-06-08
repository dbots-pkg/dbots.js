import Collection from '@discordjs/collection'
import * as PosterModule from '../../src/Interface/Poster'
import { Service } from '../../src/Interface/Service'
import TopGG from '../../src/Interface/Lists/TopGG'
import { PosterOptions } from '../../src/Utils/Constants'

describe('Poster module', () => {
  describe('Poster class', () => {
    const { Poster } = PosterModule
    const fakeClientGuilds = new Collection(
      Array(123)
        .fill('a')
        .map((_value, index) => [index, { memberCount: 2 }]) as [number, any][]
    )

    describe('constructor', () => {
      it('should throw when instatiated without options', () => {
        // @ts-expect-error
        expect(() => new Poster()).toThrow()
      })

      it('should throw without client and client id', () => {
        expect(() => new Poster({})).toThrow()
      })

      it('should correctly set default  properties', () => {
        const options: PosterOptions = { clientID: '11111111111111111' }
        const p = new Poster(options)

        expect(p.client).toBeUndefined()
        expect(p.customServices).toStrictEqual([])
        expect(p.apiKeys).toStrictEqual({})
        expect(p.handlers).toEqual(expect.any(Object))
        Object.entries(p.handlers).forEach(([key, value]) => {
          expect(key).toEqual(expect.any(String))
          expect(value).toStrictEqual([])
        })
        expect(p.options).toStrictEqual({
          ...options,
          useSharding: true
        })
      })

      it('should correctly set properties', () => {
        const options: PosterOptions = {
          client: { a: 1, b: 2, user: { id: '11111111111111111' } },
          clientLibrary: 'discord.js',
          apiKeys: { c: '3', d: '4' },
          customServices: ['e', 'f']
        }
        const p = new Poster(options)

        expect(p.client).toBe(options.client)
        expect(p.customServices).toBe(options.customServices)
        expect(p.apiKeys).toBe(options.apiKeys)
        expect(p.handlers).toEqual(expect.any(Object))
        Object.entries(p.handlers).forEach(([key, value]) => {
          expect(key).toEqual(expect.any(String))
          expect(value).toStrictEqual([])
        })
        expect(p.options)
      })
    })

    describe('getServerCount method', () => {
      it('should throw without a client', () => {
        const p = new Poster({ clientID: '11111111111111111' })
        expect(p.getServerCount).toThrow()
      })

      it('should throw without a client library', () => {
        const p = new Poster({ client: {} })
        expect(p.getServerCount).toThrow()
      })

      it('should use the provided function', () => {
        const fn = jest.fn()
        const p = new Poster({ client: {}, serverCount: fn })
        p.getServerCount()
        expect(fn).toHaveBeenCalled()
      })

      it('should use the clientFiller', () => {
        const p = new Poster({
          client: { guilds: { size: 123 } },
          clientLibrary: 'discord.js'
        })
        expect(p.getServerCount()).resolves.toBe(123)
      })

      it('should default to 0', () => {
        const p = new Poster({
          client: {},
          clientLibrary: 'discord.js'
        })
        expect(p.getServerCount()).resolves.toBe(0)
      })
    })

    describe('getUserCount method', () => {
      it('should throw without a client', () => {
        const p = new Poster({ clientID: '11111111111111111' })
        expect(p.getUserCount).toThrow()
      })

      it('should throw without a client library', () => {
        const p = new Poster({ client: {} })
        expect(p.getUserCount).toThrow()
      })

      it('should use the provided function', () => {
        const fn = jest.fn()
        const p = new Poster({ client: {}, userCount: fn })
        p.getUserCount()
        expect(fn).toHaveBeenCalled()
      })

      it('should use the clientFiller', (done) => {
        const p = new Poster({
          client: { guilds: fakeClientGuilds },
          clientLibrary: 'discord.js'
        })
        p.getUserCount()
          .then((res) => {
            expect(res).toBe(123 * 2)
            done()
          })
          .catch(() => done.fail())
      })

      it('should default to 0', () => {
        const p = new Poster({
          client: {},
          clientLibrary: 'discord.js'
        })
        expect(p.getUserCount()).resolves.toBe(0)
      })
    })

    describe('getVoiceConnections method', () => {
      it('should throw without a client', () => {
        const p = new Poster({ clientID: '11111111111111111' })
        expect(p.getVoiceConnections).toThrow()
      })

      it('should throw without a client library', () => {
        const p = new Poster({ client: {} })
        expect(p.getVoiceConnections).toThrow()
      })

      it('should use the provided function', () => {
        const fn = jest.fn()
        const p = new Poster({ client: {}, voiceConnections: fn })
        p.getVoiceConnections()
        expect(fn).toHaveBeenCalled()
      })

      it('should use the clientFiller', () => {
        const p = new Poster({
          client: { broadcasts: { size: 123 } },
          clientLibrary: 'discord.js'
        })
        expect(p.getVoiceConnections()).resolves.toBe(123)
      })

      it('should default to 0', () => {
        const p = new Poster({
          client: {},
          clientLibrary: 'discord.js'
        })
        expect(p.getVoiceConnections()).resolves.toBe(0)
      })
    })

    describe('startInterval method', () => {
      const p = new Poster({ client: {} })
      beforeAll(() => {
        jest.useFakeTimers()
      })

      afterAll(() => {
        jest.useRealTimers()
      })

      it('should return the interval ID', () => {
        expect(new Poster({ client: {} }).startInterval()).toBeDefined()
      })

      it('should call clearTimeout (but only from the second use)', () => {
        const spy = jest.spyOn(global, 'clearTimeout')

        const firstID = p.startInterval()
        expect(spy).not.toHaveBeenCalled()
        p.startInterval()
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenLastCalledWith(firstID)

        spy.mockRestore()
      })

      it('should call setInterval', () => {
        const spy = jest.spyOn(global, 'setInterval')

        p.startInterval(123)
        expect(spy).toHaveBeenCalledWith(expect.any(Function), 123)

        spy.mockRestore()
      })
    })

    describe('stopInterval method', () => {
      const p = new Poster({ client: {} })
      it("should call clearTimeout (if there's an interval)", () => {
        const spy = jest.spyOn(global, 'clearTimeout')

        p.stopInterval()
        expect(spy).not.toHaveBeenCalled()

        const id = p.startInterval()
        p.stopInterval()
        expect(spy).toHaveBeenLastCalledWith(id)

        spy.mockRestore()
      })
    })

    describe('getService method', () => {
      it("should return undefined when there's no corresponding service", () => {
        const p = new Poster({ client: {} })
        expect(p.getService('invalid-service-key')).toBeUndefined()
      })

      it("should return a class when there's no API key", () => {
        const p = new Poster({ client: {} })
        expect(p.getService('topgg')).toEqual(expect.any(Function))
      })

      it('should return an instance when the API key has been given', () => {
        const p = new Poster({ client: {}, apiKeys: { topgg: 'abc' } })
        const s: Service = p.getService('topgg')
        expect(s).toBeInstanceOf(Service)
        expect(s.token).toBe('abc')
      })
    })

    describe('post method', () => {
      const p = new Poster({
        client: {
          guilds: fakeClientGuilds,
          users: { size: 456 },
          broadcasts: { size: 789 }
        },
        clientLibrary: 'discord.js'
      })

      p.postManual = jest.fn(async (...args: any[]) => args)

      it('should call .postManual', async () => {
        await p.post()
        expect(p.postManual).toHaveBeenCalledTimes(1)
      })

      it("should default to 'all' when no service is given", async () => {
        await p.post()
        expect(p.postManual).toHaveBeenLastCalledWith('all', expect.any(Object))
      })

      it('should get the counts from the clientFiller', async () => {
        await p.post('service')
        expect(p.postManual).toHaveBeenLastCalledWith('service', {
          serverCount: 123,
          userCount: 123 * 2,
          voiceConnections: 789
        })
      })
    })

    describe('postManual method', () => {
      const counts = {
        serverCount: 123,
        userCount: 456,
        voiceConnections: 789
      }

      it('should reject when there are no apiKeys and no custom post function', (done) => {
        const p = new Poster({ client: {} })
        p.postManual('service', counts)
          .then(() => done.fail('This Promise should reject'))
          .catch((e) => {
            expect(e).toBeInstanceOf(Error)
            done()
          })
      })

      it('should reject when there is no corresponding API key', (done) => {
        const p = new Poster({ client: {}, apiKeys: { a: 'abc' } })
        p.postManual('b', counts)
          .then(() => done.fail('This Promise should reject'))
          .catch((e) => {
            expect(e).toBeInstanceOf(Error)
            done()
          })
      })

      it('should reject when an invalid service is used', (done) => {
        const p = new Poster({ client: {}, apiKeys: { a: 'abc' } })
        p.postManual('a', counts)
          .then(() => done.fail('This Promise should reject'))
          .catch((e) => {
            expect(e).toBeInstanceOf(Error)
            done()
          })
      })

      it('should use the custom post function when a custom service is used', async () => {
        const post = jest.fn()
        const p = new Poster({ clientID: '123', shard: {}, post })
        await p.postManual('custom', counts)
        expect(post).toHaveBeenCalledWith('123', counts.serverCount, {})
      })

      it("should execute n times when service = 'all'", async () => {
        const p = new Poster({
          client: {},
          apiKeys: { a: '1', b: '2', c: '3', d: '4' }
        })

        p.postManual = jest.fn(p.postManual)

        await p.postManual('all', counts).catch(() => {})
        expect(p.postManual).toHaveBeenCalledTimes(
          1 + Object.keys(p.options.apiKeys as Record<string, string>).length
        )
      })

      it('should call Service.post for the given service', async () => {
        const p = new Poster({
          client: {},
          apiKeys: { topgg: 'abc' }
        })

        // @ts-expect-error
        TopGG.post = jest.fn(async () => ({}))
        await p.postManual('topgg', counts)

        expect(TopGG.post).toHaveBeenCalledTimes(1)
        expect(TopGG.post).toHaveBeenLastCalledWith({
          token: 'abc',
          clientID: '',
          shard: undefined,
          ...counts
        })
      })
    })

    describe('addHandler method', () => {
      it('should throw when the event is not supported', () => {
        const p = new Poster({ client: {} })
        expect(() => {
          // @ts-expect-error
          p.addHandler('some_unsupported_event')
        }).toThrow()
      })

      it('should throw when the handler is not a function', () => {
        const p = new Poster({ client: {} })
        expect(() => {
          // @ts-expect-error
          p.addHandler('postSuccess', 'abc')
        }).toThrow()
      })

      it('should add the given function to the event handlers', () => {
        const p = new Poster({ client: {} })
        const h1 = jest.fn(),
          h2 = jest.fn()
        const event = 'postSuccess'

        expect(p.handlers[event]).toEqual([])

        p.addHandler(event, h1)
        expect(p.handlers[event]).toEqual([h1])

        p.addHandler(event, h2)
        expect(p.handlers[event]).toEqual([h1, h2])
      })

      it('should return the current handler list', () => {
        const p = new Poster({ client: {} })
        const h1 = jest.fn(),
          h2 = jest.fn()
        const event = 'postSuccess'

        expect(p.addHandler(event, h1)).toEqual([h1])
        expect(p.addHandler(event, h2)).toEqual([h1, h2])
      })
    })

    describe('removeHandler method', () => {
      it('should throw when the event is not supported', () => {
        const p = new Poster({ client: {} })
        expect(() => {
          // @ts-expect-error
          p.removeHandler('some_unsupported_event')
        }).toThrow()
      })

      it('should throw when the handler is not a function', () => {
        const p = new Poster({ client: {} })
        expect(() => {
          // @ts-expect-error
          p.removeHandler('postSuccess', 'abc')
        }).toThrow()
      })

      it('should remove the given function from the event handlers', () => {
        const p = new Poster({ client: {} })
        const h1 = jest.fn(),
          h2 = jest.fn()
        const event = 'postSuccess'

        p.handlers[event] = [h1, h2]
        expect(p.handlers[event]).toEqual([h1, h2])

        p.removeHandler(event, h2)
        expect(p.handlers[event]).toEqual([h1])

        p.removeHandler(event, h1)
        expect(p.handlers[event]).toEqual([])
      })

      it('should return the current handler list', () => {
        const p = new Poster({ client: {} })
        const h1 = jest.fn(),
          h2 = jest.fn()
        const event = 'postSuccess'

        p.handlers[event] = [h1, h2]

        expect(p.removeHandler(event, h1)).toEqual([h2])
        expect(p.removeHandler(event, h2)).toEqual([])
      })
    })

    describe('runHandlers method', () => {
      const p = new Poster({ client: {} })
      const h1 = jest.fn(),
        h2 = jest.fn()
      const event = 'postSuccess'

      const handlers = [h1, h2]
      p.handlers[event] = [h1, h2]

      it('should throw when hte event is not supported', () => {
        expect(() => {
          // @ts-expect-error
          p.runHandlers('some_unsupported_event')
        }).toThrow()
      })

      it('should call every handler with the given arguments (if any)', () => {
        p.runHandlers(event)
        handlers.forEach((h) => {
          expect(h).toHaveBeenLastCalledWith()
        })

        const args = ['a', 2, false, null]
        p.runHandlers(event, ...args)
        handlers.forEach((h) => {
          expect(h).toHaveBeenLastCalledWith(...args)
        })
      })
    })
  })
})
