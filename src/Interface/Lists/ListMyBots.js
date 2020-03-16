const ServiceBase = require('../ServiceBase');
const Util = require('../../Utils/Util');

/**
 * Represents the List My Bots service.
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class ListMyBots extends ServiceBase {
  static get aliases() {
    return ['listmybots', 'listmybots.com', 'listmybotscom', 'lmb'];
  }

  static get logoURL() {
    return 'https://get.snaz.in/5Vm5J7i.png';
  }

  static get name() {
    return 'List My Bots';
  }

  static get websiteURL() {
    return 'https://listmybots.com/';
  }

  static get baseURL() {
    return 'https://listmybots.com/api/public';
  }

  /**
   * Posts statistics to this service.
   * @param {Object} options The options of the request
   * @param {string} options.token The Authorization token for the request (this automatically determines what client its posting for)
   * @param {CountResolvable} options.serverCount The amount of servers that the client is in
   * @returns {Promise<AxiosResponse>}
   */
  static post({ token, serverCount }) {
    return super._post({
      method: 'post',
      url: '/bot/stats',
      headers: { Authorization: token },
      data: { server_count: Util.resolveCount(serverCount) }
    });
  }

  /**
   * Gets the statistics of this service.
   * @returns {Promise<AxiosResponse>}
   */
  getStatistics() {
    return this._request({
      url: '/stats',
      headers: { Authorization: this.token },
    }, {
      requiresToken: true
    });
  }

  /**
   * Gets the bot's info based on the token.
   * @returns {Promise<AxiosResponse>}
   */
  getCurrentBot() {
    return this._request({
      url: '/bot/me',
      headers: { Authorization: this.token },
    }, {
      requiresToken: true
    });
  }

  /**
   * Gets the bot listed on this service.
   * @param {IDResolvable} id The bot's ID
   * @returns {Promise<AxiosResponse>}
   */
  getBot(id) {
    return this._request({
      url: `/bot/${Util.resolveID(id)}`,
      headers: { Authorization: this.token },
    }, {
      requiresToken: true
    });
  }

  /**
   * Gets the user listed on this service.
   * @param {IDResolvable} id The user's ID
   * @returns {Promise<AxiosResponse>}
   */
  getUser(id) {
    return this._request({
      url: `/user/${Util.resolveID(id)}`,
      headers: { Authorization: this.token },
    }, {
      requiresToken: true
    });
  }

  /**
   * Checks whether or not a user has liked the current bot based on your token on this service.
   * @param {IDResolvable} userID The user's ID
   * @returns {Promise<AxiosResponse>}
   */
  userVoted(userID) {
    return this._request({
      url: `/bot/me/liked/${Util.resolveID(userID)}`,
      query: { id: Util.resolveID(userID) }
    });
  }
}

module.exports = ListMyBots;
