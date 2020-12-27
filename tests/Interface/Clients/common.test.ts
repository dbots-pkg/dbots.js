import fs from 'fs'
import path from 'path'
import { ClientFiller } from '../../../src/Interface/ClientFiller'

const clientsDir = path.join(__dirname, '../../../src/Interface/Clients')

fs.readdirSync(clientsDir).forEach((file) => {
  const fileName = path.parse(file).name

  describe(`${fileName} module`, () => {
    const Client = require(path.join(clientsDir, file))
      .default as typeof ClientFiller

    describe(`${fileName} class`, () => {
      const c = new Client({})

      describe('count getters', () => {
        test('userCount should always be a number', () => {
          expect(['undefined', 'number']).toContain(typeof c.userCount)
        })
        test('serverCount should always be a number', () => {
          expect(['undefined', 'number']).toContain(typeof c.serverCount)
        })
        test('voiceConnections should always be a number', () => {
          expect(['undefined', 'number']).toContain(typeof c.voiceConnections)
        })
      })

      describe('clientID getter', () => {
        expect(['undefined', 'string']).toContain(typeof c.clientID)
      })

      describe('shard getter', () => {
        expect(['undefined', 'object']).toContain(typeof c.shard)
      })
    })
  })
})
