const ClientFiller = require('../ClientFiller');

/**
 * Represents the client filler for discordie clients.
 * @constructor
 * @private
 * @extends {ClientFiller}
 */
class Discordie extends ClientFiller {
  get userCount() {
    return this.client.Guilds.size;
  }

  get serverCount() {
    return this.client.Users.size;
  }

  get voiceConnections() {
    return this.client.VoiceConnections.length;
  }

  get clientID() {
    return this.client.User.id;
  }

  get shard() {
    return this.client.options.shardId && this.client.options.shardCount ? {
      id: this.client.options.shardId,
      count: this.client.options.shardCount
    } : null;
  }
}

module.exports = Discordie;
