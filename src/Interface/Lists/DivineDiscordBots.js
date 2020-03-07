const ServiceBase = require('../ServiceBase');

/**
 * Represents the divinediscordbots.com's service
 * @see https://divinediscordbots.com/api
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class DivineDiscordBots extends ServiceBase {
  static get baseURL() {
    return 'https://divinediscordbots.com';
  }

  /**
   * Posts statistics to this service
   * @param {Object} options The options of the request
   * @param {string} options.token The Authorization token for the request
   * @param {string} options.clientID The client ID that the request will post for
   * @param {string} options.serverCount The amount of servers that the client is in
   * @returns {Promise}
   */
  static post({ token, clientID, serverCount }) {
    return super._post({
      method: 'post',
      url: `/bot/${clientID}/stats`,
      headers: { Authorization: token },
      data: { server_count: serverCount }
    });
  }

  /**
   * Gets the bot stats for your bot
   * @param {string} id The bot's ID.
   * @returns {Promise}
   */
  getBotStats(id) {
    return this._request({ url: `/bot/${id}/stats` });
  }

  /**
   * Gets the bot votes for your bot
   * @param {string} id The bot's ID.
   * @returns {Promise}
   */
  getBotVotes(id) {
    return this._request({ url: `/bot/${id}/votes` });
  }

  /**
   * Gets the widget URL for this bot
   * @param {string} id The bot's ID.
   * @param {Object} [query] The querystring that will be used in the request
   * @returns {string}
   */
  getBotWidget(id, query) {
    return this._appendQuery(`/api/widget/${id}.svg`, query, false);
  }
}

module.exports = DivineDiscordBots;
