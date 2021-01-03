const Discord = require('discord.js')
const client = new Discord.Client()
const dbots = require('dbots')

// Make sure the client has logged in before initializing a poster.
client.on('ready', () => {
  const poster = new dbots.Poster({
    client,
    apiKeys: {
      discordbotsgg: '…',
      topgg: '…',
      lsterminalink: '…',
      carbon: '…'
    },
    clientLibrary: 'discord.js'
  })

  // Starts an interval thats posts to all services every 30 minutes.
  poster.startInterval()
})
