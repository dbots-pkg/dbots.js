const ServiceBase = require('../ServiceBase');

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
   * @param {string} options.clientID The client ID that the request will post for
   * @param {number} options.serverCount The amount of servers that the client is in
   * @returns {Promise}
   */
  static post({ token, clientID, serverCount }) {
    return super._post({
      method: 'post',
      url: `/bot/${clientID}`,
      headers: { Authorization: token },
      data: { guildCount: serverCount }
    });
  }

  /**
   * Gets the statistics of this service.
   * @returns {Promise}
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
   * @param {string} id The bot's ID
   * @returns {Promise}
   */
  getBot(id) {
    return this._request({
      url: `/bot/${id}`,
      headers: { Authorization: this.token }
    }, {
      requiresToken: true
    });
  }

  /**
   * Gets the user listed on this service.
   * @param {string} id The bot's ID
   * @returns {Promise}
   */
  getUser(id) {
    return this._request({
      url: `/user/${id}`,
      headers: { Authorization: this.token }
    }, {
      requiresToken: true
    });
  }

  /**
   * Gets the widget URL for this bot.
   * @param {string} id The bot's ID
   * @param {Object} [query] The query string that will be used in the request
   * @returns {string}
   */
  getBotWidget(id, query) {
    return this._appendQuery(`/bot/${id}/widget`, query);
  }
}

module.exports = DiscordExtremeList;
