const ClientFiller = require('../ClientFiller');

/**
 * Represents the client filler for discord.io clients.
 * @constructor
 * @private
 * @extends {ClientFiller}
 */
class DiscordIO extends ClientFiller {
  get userCount() {
    return Object.keys(this.client.users).length;
  }

  get serverCount() {
    return Object.keys(this.client.servers).length;
  }

  get voiceConnections() {
    return Object.keys(this.client._vChannels).length;
  }

  get clientID() {
    return this.client.id;
  }

  get shard() {
    return this.client._shard ? {
      id: this.client._shard[0],
      count: this.client._shard[1]
    } : null;
  }
}

module.exports = DiscordIO;
