const dbots = require('dbots')
const poster = new dbots.Poster({
  clientID: '000000000000000000',
  apiKeys: {
    discordbotsgg: '…',
    topgg: '…',
    lsterminalink: '…',
    carbon: '…'
  },
  serverCount: async () => 1234,
  userCount: async () => 1234,
  voiceConnections: async () => 1234
})

// Ff the service is undefined, it posts to all services provided with a key.
poster.post('carbon')
