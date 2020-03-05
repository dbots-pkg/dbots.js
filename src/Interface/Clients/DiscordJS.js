const ClientFiller = require('../ClientFiller');

/**
 * Represents the client filter for discord.js clients
 * @private
 * @extends {ClientFiller}
 */
class DiscordJS extends ClientFiller {
  get userCount() {
    return this.client.users.size;
  }

  get serverCount() {
    return this.client.guilds.size;
  }

  get voiceConnections() {
    return this.client.broadcasts.size;
  }

  get clientID() {
    return this.client.user ? this.client.user.id : null;
  }

  get shard() {
    return this.client.shard ? {
      id: this.client.shard.id,
      count: this.client.shard.count
    } : null;
  }
}

module.exports = DiscordJS;