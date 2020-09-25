const ServiceBase = require('../ServiceBase');
const Util = require('../../Utils/Util');

/**
 * Represents the Blist service.
 * @see https://blist.xyz/docs/
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class Blist extends ServiceBase {
  static get aliases() {
    return ['blist', 'blist.xyz'];
  }

  static get logoURL() {
    return 'https://blist.xyz/main_site/staticfiles/main/assets/blist.png';
  }

  static get name() {
    return 'Blist';
  }

  static get websiteURL() {
    return 'https://blist.xyz';
  }

  static get baseURL() {
    return 'https://blist.xyz/api';
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
      url: `/bot/${Util.resolveID(clientID)}/stats/`,
      headers: { Authorization: token },
      data: shard ?
        {
          server_count: Util.resolveCount(serverCount),
          shard_count: shard.count
        } :
        { server_count: Util.resolveCount(serverCount) }
    });
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
   * Gets the bot listed on this service.
   * @param {IDResolvable} id The bot's ID
   * @returns {Promise<AxiosResponse>}
   */
  getBot(id) {
    return this._request({ url: `/bot/${Util.resolveID(id)}/stats` });
  }

  /**
   * Gets the list of people who voted this bot on this service.
   * @param {IDResolvable} id The bot's ID
   * @returns {Promise<AxiosResponse>}
   */
  getBotVotes(id) {
    return this._request({
      url: `/bot/${Util.resolveID(id)}/votes`,
      headers: { Authorization: this.token }
    }, {
      requiresToken: true
    });
  }

  /**
   * Gets the widget URL for this bot.
   * @param {IDResolvable} id The bot's ID
   * @param {Query} [query] The query string that will be used in the request
   * @returns {string}
   */
  getWidgetURL(id, query) {
    const actualQuery = Object.assign({ type: 'normal' }, query);
    return this._appendQuery(`/bot/${Util.resolveID(id)}/widget`, actualQuery);
  }
}

module.exports = Blist;
