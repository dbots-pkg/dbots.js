const ServiceBase = require('../ServiceBase');
const Util = require('../../Utils/Util');

/**
 * Represents the Glenn Bot List service.
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
    return 'https://glennbotlist.xyz/api';
  }

  /**
   * Posts statistics to this service.
   * @param {Object} options The options of the request
   * @param {string} options.token The Authorization token for the request
   * @param {IDResolvable} options.clientID The client ID that the request will post for
   * @param {CountResolvable} options.serverCount The amount of servers that the client is in
   * @returns {Promise<AxiosResponse>}
   */
  static post({ token, clientID, serverCount, shard }) {
    return super._post({
      method: 'post',
      url: `/bot/${Util.resolveID(clientID)}/stats`,
      headers: { Authorization: token },
      data: { 
        serverCount: Util.resolveCount(serverCount), 
        shardCount: shard ? Util.resolveCount(shard.count) : undefined
      }
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
   * Get a user's profile listed on this service.
   * @param {IDResolvable} id The user's ID
   * @returns {Promise<AxiosResponse>}
   */
  getUser(id) {
    return this._request({ url: `/user/${Util.resolveID(id)}` });
  }

  /**
   * Gets the widget URL for this bot.
   * @param {IDResolvable} id The bot's ID
   * @param {Query} [query] The query string that will be used in the request
   * @returns {string}
   */
  getWidgetURL(id, query) {
    return this._appendQuery(`https://glennbotlist.xyz/bot/${Util.resolveID(id)}/widget`, query, false);
  }
}

module.exports = GlennBotList;
