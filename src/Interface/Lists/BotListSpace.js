const ServiceBase = require('../ServiceBase');
const Util = require('../../Utils/Util');

/**
 * Represents the botlist.space service.
 * @see https://docs.botlist.space/
 * @extends {ServiceBase}
 * 
 * @constructor
 * @param {string} token The token/key for the service
 */
class BotListSpace extends ServiceBase {
  static get aliases() {
    return ['botlistspace', 'botlist.space', 'bls'];
  }

  static get logoURL() {
    return 'https://i.olsh.me/icon?size=1..100..500&url=botlist.space';
  }

  static get name() {
    return 'botlist.space';
  }

  static get websiteURL() {
    return 'https://botlist.space';
  }

  static get baseURL() {
    return 'https://api.botlist.space/v1';
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
      url: `/bots/${Util.resolveID(clientID)}`,
      headers: { Authorization: token },
      data: { server_count: Util.resolveCount(serverCount) }
    });
  }

  /**
   * Gets the statistics of this service.
   * @returns {Promise<AxiosResponse>}
   */
  getStatistics() {
    return this._request({ url: '/statistics' });
  }

  /**
   * Gets a list of bots on this service.
   * @returns {Promise<AxiosResponse>}
   */
  getBots() {
    return this._request({ url: '/bots' });
  }

  /**
   * Gets the bot listed on this service.
   * @param {IDResolvable} id The bot's ID
   * @returns {Promise<AxiosResponse>}
   */
  getBot(id) {
    return this._request({ url: `/bots/${Util.resolveID(id)}` });
  }

  /**
   * Gets the list of people who voted this bot on this service.
   * @param {IDResolvable} id The bot's ID
   * @returns {Promise<AxiosResponse>}
   */
  getBotVotes(id) {
    return this._request({
      url: `/bots/${Util.resolveID(id)}/upvotes`,
      headers: { Authorization: this.token }
    }, {
      requiresToken: true
    });
  }

  /**
   * Gets the uptime of a bot listed on this service.
   * @param {IDResolvable} id The bot's ID
   * @returns {Promise<AxiosResponse>}
   */
  getBotUptime(id) {
    return this._request({ url: `/bots/${Util.resolveID(id)}/uptime` });
  }

  /**
   * Gets the user listed on this service.
   * @param {IDResolvable} id The user's ID
   * @returns {Promise<AxiosResponse>}
   */
  getUser(id) {
    return this._request({ url: `/users/${Util.resolveID(id)}` });
  }

  /**
   * Gets the user's bots listed for this service.
   * @param {IDResolvable} id The user's ID
   * @returns {Promise<AxiosResponse>}
   */
  getUserBots(id) {
    return this._request({ url: `/users/${Util.resolveID(id)}/bots` });
  }

  /**
   * Gets the widget URL for this bot.
   * @param {IDResolvable} id The bot's ID
   * @param {CountResolvable} [style=1] The style of the widget, cannot be zero
   * @param {Query} [query] The query string that will be used in the request
   * @returns {string}
   */
  getWidgetURL(id, style = 1, query = undefined) {
    return this._appendQuery(`https://api.botlist.space/widget/${Util.resolveID(id)}/${style}`, query, false);
  }
}

module.exports = BotListSpace;
