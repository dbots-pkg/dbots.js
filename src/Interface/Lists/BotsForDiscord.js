const ServiceBase = require('../ServiceBase');

/**
 * Represents the Bots For Discord service.
 * @see https://docs.botsfordiscord.com/
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class BotsForDiscord extends ServiceBase {
  static get aliases() {
    return ['botsfordiscord', 'botsfordiscord.com', 'bfd'];
  }

  static get logoURL() {
    return 'https://i.olsh.me/icon?size=1..100..500&url=botsfordiscord.com';
  }
  
  static get name() {
    return 'Bots For Discord';
  }
  
  static get websiteURL() {
    return 'https://botsfordiscord.com';
  }

  static get baseURL() {
    return 'https://botsfordiscord.com/api';
  }

  /**
   * Posts statistics to this service.
   * @param {Object} options The options of the request
   * @param {string} options.token The Authorization token for the request
   * @param {string} options.clientID The client ID that the request will post for
   * @param {number} options.serverCount The amount of servers that the client is in
   * @returns {Promise<AxiosResponse>}
   */
  static post({ token, clientID, serverCount }) {
    return super._post({
      method: 'post',
      url: `/bot/${clientID}`,
      headers: { Authorization: token },
      data: { server_count: serverCount }
    });
  }

  /**
   * Gets the bot listed on this service.
   * @param {string} id The bot's ID
   * @returns {Promise<AxiosResponse>}
   */
  getBot(id) {
    return this._request({ url: `/bot/${id}` });
  }

  /**
   * Gets the list of people who voted this bot on this service.
   * @param {string} id The bot's ID
   * @returns {Promise<AxiosResponse>}
   */
  getBotVotes(id) {
    return this._request({ url: `/bot/${id}/votes` });
  }

  /**
   * Gets the user listed on this service.
   * @param {string} id The user's ID
   * @returns {Promise<AxiosResponse>}
   */
  getUser(id) {
    return this._request({ url: `/user/${id}` });
  }

  /**
   * Gets the user's bots listed for this service.
   * @param {string} id The user's ID
   * @returns {Promise<AxiosResponse>}
   */
  getUserBots(id) {
    return this._request({ url: `/user/${id}/bots` });
  }

  /**
   * Gets the widget URL for this bot.
   * @param {string} id The bot's ID
   * @param {Query} [query] The query string that will be used in the request
   * @returns {string}
   */
  getBotWidget(id, query) {
    return this._appendQuery(`/bot/${id}/widget`, query);
  }
}

module.exports = BotsForDiscord;
