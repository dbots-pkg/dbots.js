const ServiceBase = require('../ServiceBase');
const Util = require('../../Utils/Util');

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
   * <warn>Shard data posting is not supported for this service.</warn>
   * @param {Object} options The options of the request
   * @param {string} options.token The Authorization token for the request
   * @param {IDResolvable} options.clientID The client ID that the request will post for
   * @param {CountResolvable} options.serverCount The amount of servers that the client is in
   * @returns {Promise<AxiosResponse>}
   */
  static post({ token, clientID, serverCount }) {
    return super._post({
      method: 'post',
      url: `/bot/${Util.resolveID(clientID)}/stats`,
      headers: { Authorization: token },
      data: { guildCount: Util.resolveCount(serverCount) }
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
   * @param {IDResolvable} id The bot's ID
   * @returns {Promise<AxiosResponse>}
   */
  getBot(id) {
    return this._request({ url: `/bot/${Util.resolveID(id)}` });
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
   * @param {IDResolvable} id The user's ID
   * @returns {Promise<AxiosResponse>}
   */
  getUserBots(id) {
    return this._request({ url: `/bots/user/${Util.resolveID(id)}` });
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
    return this._request({ url: '/bots/page', params: query });
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
