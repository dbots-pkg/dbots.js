const ClientFiller = require('../ClientFiller');

/**
 * Represents the client filter for Eris clients
 * @private
 * @extends {ClientFiller}
 */
class Eris extends ClientFiller {
  get userCount() {
    return this.client.users.size;
  }

  get serverCount() {
    return this.client.guilds.size;
  }

  get voiceConnections() {
    if(this.client.voiceConnections.constructor.name === 'VoiceConnectionManager')
      return this.client.voiceConnections.size;
    else return Object.keys(this.client.voiceConnections.pendingGuilds).size;
  }

  get clientID() {
    return this.client.user ? this.client.user.id : null;
  }
}

module.exports = Eris;
