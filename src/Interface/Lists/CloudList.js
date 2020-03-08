const ServiceBase = require('../ServiceBase');

/**
 * Represents the Cloud List service
 * @see https://www.cloudlist.xyz/apidocs
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class CloudList extends ServiceBase {
  static get aliases() {
    return ['cloudlist', 'cloudlistxyz', 'cloudlist.xyz'];
  }

  static get logoURL() {
    return 'https://i.olsh.me/icon?size=1..100..500&url=www.cloudlist.xyz';
  }

  static get name() {
    return 'Cloud List';
  }

  static get websiteURL() {
    return 'https://www.cloudlist.xyz/';
  }

  static get baseURL() {
    return 'https://www.cloudlist.xyz/api';
  }

  /**
   * Posts statistics to this service
   * @param {Object} options The options of the request
   * @param {string} options.token The Authorization token for the request
   * @param {string} options.clientID The client ID that the request will post for
   * @param {number} options.serverCount The amount of servers that the client is in
   * @returns {Promise}
   */
  static post({ token, clientID, serverCount }) {
    return super._post({
      method: 'post',
      url: `/stats/${clientID}`,
      headers: { Authorization: token },
      data: { count: serverCount }
    });
  }

  /**
   * Gets the bot listed for this service
   * @param {string} id The bot's ID.
   * @returns {Promise}
   */
  getBot(id) {
    return this._request({
      url: `/bot/${id}`,
      headers: { Authorization: this.token },
    }, {
      requiresToken: true
    });
  }

  /**
   * Gets the bot votes for your bot
   * @param {string} id The bot's ID.
   * @returns {Promise}
   */
  getBotVotes(id) {
    return this._request({
      url: `/bot/vote/${id}`,
      headers: { Authorization: this.token },
    }, {
      requiresToken: true
    });
  }
}

module.exports = CloudList;
