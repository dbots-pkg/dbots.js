const ServiceBase = require('../ServiceBase');
const Util = require('../../Utils/Util');

/**
 * Represents the Wonder Bot List service.
 * @see https://api.wonderbotlist.com/en/
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class WonderBotList extends ServiceBase {
  static get aliases() {
    return ['wonderbotlist', 'wonderbotlist.com', 'wonderbotlistcom', 'wonder', 'wbl'];
  }

  static get logoURL() {
    return 'https://get.snaz.in/8Jk3EJg.png';
  }

  static get name() {
    return 'Wonder Bot List';
  }

  static get websiteURL() {
    return 'https://wonderbotlist.com/en';
  }

  static get baseURL() {
    return 'https://api.wonderbotlist.com/v1';
  }

  /**
   * Posts statistics to this service.
   * @param {Object} options The options of the request
   * @param {string} options.token The Authorization token for the request
   * @param {IDResolvable} options.clientID The client ID that the request will post for
   * @param {CountResolvable} options.serverCount The amount of servers that the client is in
   * @param {Shard} options.shard The shard the request is representing
   * @returns {Promise<AxiosResponse>}
   */
  static post({ token, clientID, serverCount, shard }) {
    return super._post({
      method: 'post',
      url: `/bot/${Util.resolveID(clientID)}`,
      headers: { Authorization: token },
      params: shard ? 
        { serveurs: Util.resolveCount(serverCount), shard: shard.count } : 
        { serveurs: Util.resolveCount(serverCount) }
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
      headers: { Authorization: this.token }
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
      headers: { Authorization: this.token }
    }, {
      requiresToken: true
    });
  }
}

module.exports = WonderBotList;
