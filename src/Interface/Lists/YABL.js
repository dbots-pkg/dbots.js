const ServiceBase = require('../ServiceBase');

/**
 * Represents the YABL service.
 * @see https://yabl.xyz/api
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class YABL extends ServiceBase {
  static get aliases() {
    return ['yabl', 'yablxyz', 'yabl.xyz'];
  }

  static get logoURL() {
    return 'https://i.imgur.com/OFiMern.png';
  }

  static get name() {
    return 'Yet Another Bot List';
  }

  static get websiteURL() {
    return 'https://yabl.xyz/';
  }

  static get baseURL() {
    return 'https://yabl.xyz/api';
  }

  /**
   * Posts statistics to this service.
   * @param {Object} options The options of the request
   * @param {string} options.token The Authorization token for the request
   * @param {string} options.clientID The client ID that the request will post for
   * @param {number} options.serverCount The amount of servers that the client is in
   * @returns {Promise<AxiosResponse>}
   */
  static post({ token, clientID, serverCount }) {
    return super._post({
      method: 'post',
      url: `/bot/${clientID}/stats`,
      headers: { Authorization: token },
      data: { guildCount: serverCount }
    });
  }

  /**
   * Invalidates the token being used in the request.
   * @returns {Promise<AxiosResponse>}
   */
  invalidate() {
    return this._request({
      url: '/token/invalidate',
      headers: { Authorization: this.token }
    }, {
      requiresToken: true
    });
  }

  /**
   * Gets the bot listed on this service.
   * @param {string} id The bot's ID
   * @returns {Promise<AxiosResponse>}
   */
  getBot(id) {
    return this._request({ url: `/bot/${id}` });
  }

  /**
   * Gets 20 random bots from this service.
   * @returns {Promise<AxiosResponse>}
   */
  getRandomBots() {
    return this._request({ url: '/bots' });
  }

  /**
   * Gets the user's bots listed for this service.
   * @param {string} id The user's ID
   * @returns {Promise<AxiosResponse>}
   */
  getUserBots(id) {
    return this._request({ url: `/bots/user/${id}` });
  }

  /**
   * Gets a list of bots on this service.
   * @returns {Promise<AxiosResponse>}
   */
  getBots() {
    return this._request({
      url: '/bots/all',
      headers: { Authorization: this.token }
    }, {
      requiresToken: true
    });
  }

  /**
   * Gets a page of bots on this service.
   * @param {Query} query The query string that will be used in the request
   * @returns {Promise<AxiosResponse>}
   */
  getBotsByPage(query) {
    return this._request({ url: '/bots/all', params: query });
  }

  /**
   * Gets a list of unverified bots on this service.
   * @returns {Promise<AxiosResponse>}
   */
  getUnverifiedBots() {
    return this._request({
      url: '/bots/unverified',
      headers: { Authorization: this.token }
    }, {
      requiresToken: true
    });
  }
}

module.exports = YABL;
