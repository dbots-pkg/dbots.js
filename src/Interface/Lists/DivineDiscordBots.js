const ServiceBase = require('../ServiceBase');

/**
 * Represents the Divine Discord Bots service.
 * @see https://divinediscordbots.com/api
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class DivineDiscordBots extends ServiceBase {
  static get aliases() {
    return ['divinediscordbots', 'divinediscordbots.com', 'divinedbots', 'divine', 'ddb'];
  }

  static get logoURL() {
    return 'https://i.olsh.me/icon?size=1..100..500&url=divinediscordbots.com';
  }

  static get name() {
    return 'Divine Discord Bots';
  }

  static get websiteURL() {
    return 'https://divinediscordbots.com';
  }

  static get baseURL() {
    return 'https://divinediscordbots.com';
  }

  /**
   * Posts statistics to this service.
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
   * Gets the statistics of your bot on this service.
   * @param {string} id The bot's ID
   * @returns {Promise}
   */
  getBotStats(id) {
    return this._request({ url: `/bot/${id}/stats` });
  }

  /**
   * Gets the list of people who votes this bot on this service.
   * @param {string} id The bot's ID
   * @returns {Promise}
   */
  getBotVotes(id) {
    return this._request({ url: `/bot/${id}/votes` });
  }

  /**
   * Gets the widget URL for this bot.
   * @param {string} id The bot's ID
   * @param {Query} [query] The query string that will be used in the request
   * @returns {string}
   */
  getBotWidget(id, query) {
    return this._appendQuery(`/api/widget/${id}.svg`, query, false);
  }
}

module.exports = DivineDiscordBots;
