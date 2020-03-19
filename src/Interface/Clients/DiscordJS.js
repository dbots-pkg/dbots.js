const ClientFiller = require('../ClientFiller');

/**
 * Represents the client filler for discord.js clients.
 * @constructor
 * @private
 * @extends {ClientFiller}
 */
class DiscordJS extends ClientFiller {
  get userCount() {
    if (this.client.users.constructor.name === 'UserManager')
      return this.client.users.cache.size;
    else return this.client.users.size;
  }

  get serverCount() {
    if (this.client.guilds.constructor.name === 'GuildManager')
      return this.client.guilds.cache.size;
    else return this.client.guilds.size;
  }

  get voiceConnections() {
    if (this.client.voice)
      return this.client.voice ? this.client.voice.broadcasts.length : 0;
    else return this.client.broadcasts.size;
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
