const ServiceBase = require('../ServiceBase');

/**
 * Represents the Bots For Discord service
 * @see https://docs.botsfordiscord.com/
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class BotsForDiscord extends ServiceBase {
  static get baseURL() {
    return 'https://botsfordiscord.com/api';
  }

  /**
   * Gets the bot listed for this service
   * @param {string} id The bot's ID.
   */
  getBot(id) {
    return this._request({ url: `/bot/${id}` });
  }

  /**
   * Gets the widget for this bot
   * @param {string} id The bot's ID.
   * @param {Object} query The querystring that will be used in the request
   */
  getBotWidget(id, query) {
    return this._request({ url: `/bots/${id}/widget`, params: query });
  }

  /**
   * Gets the votes for this bot
   * @param {string} id The bot's ID.
   */
  getBotVotes(id) {
    return this._request({ url: `/bots/${id}/votes` });
  }

  /**
   * Gets the user listed for this service
   * @param {string} id The user's ID.
   */
  getUser(id) {
    return this._request({ url: `/user/${id}` });
  }

  /**
   * Gets the user's list of managed bots
   * @param {string} id The user's ID.
   */
  getUserBots(id) {
    return this._request({ url: `/user/${id}/bots` });
  }
}

module.exports = BotsForDiscord;
