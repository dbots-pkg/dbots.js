const dbots = require('dbots')

// This does not explicitly have o be a class
// As long as it follows the same structure
class MyCustomService {
  static get aliases() {
    return ['a', 'string', 'array']
  }

  static async post(options) {
    const { token, clientID, serverCount, userCount, voiceConnections, shard } = options
    return yourCustomPostMethod(token, clientID, serverCount, userCount, voiceConnections, shard)
  }
}

const poster = new dbots.Poster({
  clientID: '000000000000000000',
  apiKeys: {
    discordbotsgg: '…',
    topgg: '…',
    lsterminalink: '…',
    carbon: '…'
  },
  customServices: [new MyCustomService()],
  serverCount: async () => 1234,
  userCount: async () => 1234,
  voiceConnections: async () => 1234
})
