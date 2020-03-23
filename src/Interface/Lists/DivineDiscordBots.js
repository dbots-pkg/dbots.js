const ServiceBase = require('../ServiceBase');
const Util = require('../../Utils/Util');

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
    return 'https://i.imgur.com/WhvKku7.png';
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
   * @param {IDResolvable} options.clientID The client ID that the request will post for
   * @param {CountResolvable} options.serverCount The amount of servers that the client is in
   * @returns {Promise<AxiosResponse>}
   */
  static post({ token, clientID, serverCount }) {
    return super._post({
      method: 'post',
      url: `/bot/${Util.resolveID(clientID)}/stats`,
      headers: { Authorization: token },
      data: { server_count: Util.resolveCount(serverCount) }
    });
  }

  /**
   * Gets the statistics of your bot on this service.
   * @param {IDResolvable} id The bot's ID
   * @returns {Promise<AxiosResponse>}
   */
  getBotStats(id) {
    return this._request({ url: `/bot/${Util.resolveID(id)}/stats` });
  }

  /**
   * Gets the list of people who voted this bot on this service.
   * @param {IDResolvable} id The bot's ID
   * @returns {Promise<AxiosResponse>}
   */
  getBotVotes(id) {
    return this._request({ url: `/bot/${Util.resolveID(id)}/votes` });
  }

  /**
   * Gets the widget URL for this bot.
   * @param {IDResolvable} id The bot's ID
   * @param {Query} [query] The query string that will be used in the request
   * @returns {string}
   */
  getWidgetURL(id, query) {
    return this._appendQuery(`/api/widget/${Util.resolveID(id)}.svg`, query, false);
  }
}

module.exports = DivineDiscordBots;
