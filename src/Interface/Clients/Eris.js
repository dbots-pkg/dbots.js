const ClientFiller = require('../ClientFiller');

/**
 * Represents the client filler for Eris clients.
 * @private
 * @extends {ClientFiller}
 */
class Eris extends ClientFiller {
  constructor(client) {
    super(client);
  }

  get userCount() {
    return this.client.users.size;
  }

  get serverCount() {
    return this.client.guilds.size;
  }

  get voiceConnections() {
    if (this.client.voiceConnections.constructor.name === 'VoiceConnectionManager')
      return this.client.voiceConnections.size;
    else return Object.keys(this.client.voiceConnections.pendingGuilds).length;
  }

  get clientID() {
    return this.client.user ? this.client.user.id : null;
  }

  /**
   * This client does not natively support sharding.
   * @type {null}
   * @readonly
   * @private
   */
  get shard() {
    return null;
  }
}

module.exports = Eris;
