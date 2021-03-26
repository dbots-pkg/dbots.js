import fs from 'fs'
import path from 'path'
import { ClientFiller } from '../../../src/Interface/ClientFiller'
import Collection from '@discordjs/collection'

const clientsDir = path.join(__dirname, '../../../src/Interface/Clients')

const fakeClients = {
  Discordie: {
    Guilds: {
      size: 123,
      toArray: () => [1, 2, 3].map((n) => ({ member_count: n }))
    },
    VoiceConnections: [1, 2, 3],
    User: { id: 'abc' },
    options: {
      shardId: 'abc',
      shardCount: 123
    }
  },
  DiscordIO: {
    servers: [1, 2, 3].map((n) => ({ member_count: n })),
    _vChannels: [1, 2, 3],
    id: 'abc',
    _shard: ['abc', 123]
  },
  DiscordJS: {
    guilds: {
      constructor: { name: 'GuildManager' },
      cache: new Collection([1, 2, 3].map((n) => [n, { memberCount: n }]))
    },
    voice: { broadcasts: [1, 2, 3] },
    user: { id: 'abc' },
    shard: {
      id: 'abc',
      count: 123
    }
  },
  Eris: {
    guilds: new Collection([1, 2, 3].map((n) => [n, { memberCount: n }])),
    voiceConnections: {
      constructor: { name: 'VoiceConnectionManager' },
      size: 123
    },
    user: { id: 'abc' }
  },
  Paracord: {
    guilds: {
      values: [1, 2, 3].map((n) => [n, { member_count: n }]),
      size: 123
    },
    user: { id: 'abc' }
  }
}
const noVoiceFillers: (keyof typeof fakeClients)[] = ['Paracord']
const noShardFillers: (keyof typeof fakeClients)[] = ['Eris', 'Paracord']

fs.readdirSync(clientsDir).forEach((file) => {
  const fileName = path.parse(file).name as keyof typeof fakeClients

  describe(`${fileName} module`, () => {
    const Client = require(path.join(clientsDir, file))
      .default as typeof ClientFiller

    describe(`${fileName} class`, () => {
      const emptyClient = new Client({})
      const fakeClient = fakeClients[fileName]

      const testClient = (c: ClientFiller, name: string, empty = false) => {
        const eType = empty ? 'undefined' : undefined

        describe(name, () => {
          describe('count getters', () => {
            test(`userCount should be ${eType ?? 'a number'}`, () => {
              expect(typeof c.userCount).toBe(eType ?? 'number')
            })
            test(`serverCount should be ${eType ?? 'a number'}`, () => {
              expect(typeof c.serverCount).toBe(eType ?? 'number')
            })

            if (!noVoiceFillers.includes(fileName))
              test(`voiceConnections should be ${eType ?? 'a number'}`, () => {
                expect(typeof c.voiceConnections).toBe(eType ?? 'number')
              })
            else
              test(`voiceConnections should always be undefined`, () => {
                expect(typeof c.voiceConnections).toBe('undefined')
              })
          })

          describe('clientID getter', () => {
            it(`should be ${eType ?? 'a string'}`, () => {
              expect(typeof c.clientID).toBe(eType ?? 'string')
            })
          })

          describe('shard getter', () => {
            if (!noShardFillers.includes(fileName))
              it('should be an object', () => {
                expect(typeof c.shard).toBe(eType ?? 'object')
              })
            else
              it('should always be undefined', () => {
                expect(typeof c.shard).toBe('undefined')
              })
          })
        })
      }

      testClient(emptyClient, 'empty client', true)
      if (fakeClient) testClient(new Client(fakeClient), 'fake client')
    })
  })
})
