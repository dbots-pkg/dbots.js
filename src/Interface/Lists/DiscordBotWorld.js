const ServiceBase = require('../ServiceBase');

/**
 * Represents the Discord Bot World service.
 * @see https://discordbot.world/docs
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class DiscordBotWorld extends ServiceBase {
  static get aliases() {
    return ['discordbotworld', 'discordbot.world', 'dbotworld', 'dbw'];
  }

  static get logoURL() {
    return 'https://i.olsh.me/icon?size=1..100..500&url=discordbot.world';
  }

  static get name() {
    return 'Discord Bot World';
  }

  static get websiteURL() {
    return 'https://discordbot.world';
  }

  static get baseURL() {
    return 'https://discordbot.world/api';
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
      url: `/bot/${clientID}/stats`,
      headers: { Authorization: token },
      data: { guild_count: serverCount }
    });
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
   * @param {string} id The bot's ID
   * @returns {Promise<AxiosResponse>}
   */
  getBot(id) {
    return this._request({ url: `/bots/${id}/info` });
  }

  /**
   * Gets the bot's stats on this service.
   * @param {string} id The bot's ID
   * @returns {Promise<AxiosResponse>}
   */
  getBotStats(id) {
    return this._request({ url: `/bots/${id}/stats` });
  }

  /**
   * Gets the list of people who liked this bot on this service.
   * @param {string} id The bot's ID
   * @returns {Promise<AxiosResponse>}
   */
  getBotLikes(id) {
    return this._request({
      url: `/bots/${id}/likes`,
      headers: { Authorization: this.token }
    }, {
      requiresToken: true
    });
  }

  /**
   * Gets the user listed on this service.
   * @param {string} id The user's ID
   * @returns {Promise<AxiosResponse>}
   */
  getUser(id) {
    return this._request({ url: `/user/${id}` });
  }
}

module.exports = DiscordBotWorld;
