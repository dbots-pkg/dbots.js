const ServiceBase = require('../ServiceBase');
const Util = require('../../Utils/Util');

/**
 * Represents the Discord Extreme List service.
 * @see https://docs.discordextremelist.xyz/
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class DiscordExtremeList extends ServiceBase {
  static get aliases() {
    return ['discordextremelist', 'discordextremelist.xyz', 'discordextremelistxyz', 'del'];
  }

  static get logoURL() {
    return 'https://get.snaz.in/4KjWg91.png';
  }

  static get name() {
    return 'Discord Extreme List';
  }

  static get websiteURL() {
    return 'https://discordextremelist.xyz/';
  }

  static get baseURL() {
    return 'https://api.discordextremelist.xyz/v1';
  }

  /**
   * Posts statistics to this service.
   * @param {Object} options The options of the request
   * @param {string} options.token The Authorization token for the request
   * @param {IDResolvable} options.clientID The client ID that the request will post for
   * @param {CountResolvable} options.serverCount The amount of servers that the client is in
   * @returns {Promise<AxiosResponse>}
   */
  static post({ token, clientID, serverCount }) {
    return super._post({
      method: 'post',
      url: `/bot/${Util.resolveID(clientID)}`,
      headers: { Authorization: token },
      data: { guildCount: Util.resolveCount(serverCount) }
    });
  }

  /**
   * Gets the statistics of this service.
   * @returns {Promise<AxiosResponse>}
   */
  getStatistics() {
    return this._request({
      url: '/stats',
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
    return this._request({
      url: `/bot/${Util.resolveID(id)}`,
      headers: { Authorization: this.token }
    }, {
      requiresToken: true
    });
  }

  /**
   * Gets the user listed on this service.
   * @param {IDResolvable} id The bot's ID
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

  /**
   * Gets the widget URL for this bot.
   * @param {IDResolvable} id The bot's ID
   * @param {Query} [query] The query string that will be used in the request
   * @returns {string}
   */
  getBotWidget(id, query) {
    return this._appendQuery(`/bot/${Util.resolveID(id)}/widget`, query);
  }
}

module.exports = DiscordExtremeList;
