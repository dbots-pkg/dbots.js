import * as ClientFillerModule from '../../src/Interface/ClientFiller'

describe('ClientFiller module', () => {
  const { ClientFiller, getClientFiller } = ClientFillerModule

  describe('ClientFiller class', () => {
    let cf: ClientFillerModule.ClientFiller
    const customClient = { a: 'a', b: 'b' }

    it('should instantiate', () => {
      expect(() => {
        cf = new ClientFiller(customClient)
      }).not.toThrow()
    })

    it('should correctly set the client', () => {
      expect(cf.client).toBe(customClient)
    })

    it('should only have placeholder properties', () => {
      expect(cf.userCount).toBe(0)
      expect(cf.serverCount).toBe(0)
      expect(cf.voiceConnections).toBe(0)
      expect(cf.clientID).toBeUndefined()
      expect(cf.shard).toBeUndefined()
    })
  })

  describe('getClientFiller function', () => {
    it('should throw without any client', () => {
      // @ts-expect-error
      expect(() => getClientFiller('')).toThrow()
    })

    it('should throw without a valid library name', () => {
      expect(() => {
        // @ts-expect-error
        getClientFiller('invalid', {})
      }).toThrow()
    })

    it('should return a ClientFiller for every supported library', () => {
      expect(getClientFiller('discordie', {})).toBeInstanceOf(ClientFiller)
      expect(getClientFiller('discord.io', {})).toBeInstanceOf(ClientFiller)
      expect(getClientFiller('discord.js', {})).toBeInstanceOf(ClientFiller)
      expect(getClientFiller('eris', {})).toBeInstanceOf(ClientFiller)
      expect(getClientFiller('paracord', {})).toBeInstanceOf(ClientFiller)
    })
  })
})
