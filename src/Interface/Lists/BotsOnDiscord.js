const ServiceBase = require('../ServiceBase');

/**
 * Represents the Bots On Discord service
 * @see https://bots.ondiscord.xyz/info/api
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class BotsOnDiscord extends ServiceBase {
  static get aliases() {
    return ['botsondiscord', 'bots.ondiscord.xyz', 'bod'];
  }

  static get logoURL() {
    return 'https://i.olsh.me/icon?size=1..100..500&url=bots.ondiscord.xyz';
  }
  
  static get name() {
    return 'Bots On Discord';
  }

  static get websiteURL() {
    return 'https://bots.ondiscord.xyz';
  }

  static get baseURL() {
    return 'https://bots.ondiscord.xyz/bot-api';
  }

  /**
   * Posts statistics to this service
   * @param {Object} options The options of the request
   * @param {string} options.token The Authorization token for the request
   * @param {string} options.clientID The client ID that the request will post for
   * @param {number} options.serverCount The amount of servers that the client is in
   * @returns {Promise}
   */
  static post({ token, clientID, serverCount }) {
    return super._post({
      method: 'post',
      url: `/bots/${clientID}/guilds`,
      headers: { Authorization: token },
      data: { guildCount: serverCount }
    });
  }

  /**
   * Checks whether or not a user has reviewed a bot
   * @param {string} id The bot's ID.
   * @param {string} userId The user's ID.
   * @returns {Promise}
   */
  checkReview(id, userId) {
    return this._request({
      url: `/bots/${id}/review`,
      params: { owner: userId }
    }, {
      requiresToken: true
    });
  }

  /**
   * Gets the widget URL for this bot
   * @param {string} id The bot's ID.
   * @param {Object} [query] The querystring that will be used in the request
   * @returns {string}
   */
  getBotWidget(id, query) {
    return this._appendQuery(`https://bots.ondiscord.xyz/bots/${id}/embed`, query, false);
  }
}

module.exports = BotsOnDiscord;
