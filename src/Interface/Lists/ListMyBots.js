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
    return 'https://listmybots.com/api';
  }

  /**
   * Posts statistics to this service.
   * <warn>Shard data posting is not supported for this service.</warn>
   * @param {Object} options The options of the request
   * @param {string} options.token The Authorization token for the request (this automatically determines what client its posting for)
   * @param {string} options.clientID The client ID that the request will post for
   * @param {CountResolvable} options.serverCount The amount of servers that the client is in
   * @returns {Promise<AxiosResponse>}
   */
  static post({ token, clientID, serverCount }) {
    return super._post({
      method: 'post',
      url: `/bot/${Util.resolveID(clientID)}`,
      headers: { Authorization: token },
      data: { count: Util.resolveCount(serverCount) }
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
   * Gets the status widget URL for this bot.
   * @param {IDResolvable} id The bot's ID
   * @param {Query} [query] The query string that will be used in the request
   * @returns {string}
   */
  getStatusWidgetURL(id, query) {
    return this._appendQuery(`https://listmybots.com/api/bot/${Util.resolveID(id)}/widget/status`, query, false);
  }

  /**
   * Gets the user listed on this service.
   * @param {IDResolvable} id The user's ID
   * @returns {Promise<AxiosResponse>}
   */
  getUser(id) {
    return this._request({ url: `/user/${Util.resolveID(id)}` });
  }

  /**
   * Gets the info about someone's bots.
   * @param {IDResolvable} id The user's ID
   * @returns {Promise<AxiosResponse>}
   */
  getUserBots(id) {
    return this._request({ url: `/bots/${Util.resolveID(id)}` });
  }

  /**
   * Gets the widget URL for this bot.
   * @param {IDResolvable} id The bot's ID
   * @param {Query} [query] The query string that will be used in the request
   * @returns {string}
   */
  getWidgetURL(id, query) {
    return this._appendQuery(`https://listmybots.com/api/bot/${Util.resolveID(id)}/widget`, query, false);
  }
}

module.exports = ListMyBots;
