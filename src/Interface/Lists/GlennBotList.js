const ServiceBase = require('../ServiceBase');

/**
 * Represents the Glenn Bot List service
 * @see https://docs.glennbotlist.xyz/
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class GlennBotList extends ServiceBase {
  static get aliases() {
    return ['glennbotlist', 'glennbotlist.xyz', 'glennbotlist.gg', 'glenn'];
  }

  static get logoURL() {
    return 'https://get.snaz.in/8HphUE7.jpg';
  }

  static get name() {
    return 'Glenn Bot List';
  }

  static get websiteURL() {
    return 'https://glennbotlist.xyz';
  }

  static get baseURL() {
    return 'https://glennbotlist.xyz/api/v2';
  }

  /**
   * Posts statistics to this service
   * @param {Object} options The options of the request
   * @param {string} options.token The Authorization token for the request
   * @param {string} options.clientID The client ID that the request will post for
   * @param {string} options.serverCount The amount of servers that the client is in
   * @returns {Promise}
   */
  static post({ token, clientID, serverCount }) {
    return super._post({
      method: 'post',
      url: `/bot/${clientID}/stats`,
      headers: { Authorization: token },
      data: { serverCount }
    });
  }

  /**
   * Gets the bot listed for this service
   * @param {string} id The bot's ID.
   * @returns {Promise}
   */
  getBot(id) {
    return this._request({ url: `/bot/${id}` });
  }

  /**
   * Gets the bot's votes on this service
   * @param {string} id The bot's ID.
   * @returns {Promise}
   */
  getBotVotes(id) {
    return this._request({ url: `/bot/${id}/votes` }, {
      requiresToken: true
    });
  }

  /**
   * Get a user's profile listed on this service
   * @param {string} id The user's ID.
   * @returns {Promise}
   */
  getProfile(id) {
    return this._request({ url: `/profile/${id}` });
  }

  /**
   * Gets the widget URL for this bot
   * @param {string} id The bot's ID.
   * @param {Object} [query] The querystring that will be used in the request
   * @returns {string}
   */
  getBotWidget(id, query) {
    return this._appendQuery(`https://glennbotlist.xyz/bot/${id}/widget`, query, false);
  }
}

module.exports = GlennBotList;
