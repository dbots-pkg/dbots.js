const ServiceBase = require('../ServiceBase');

/**
 * Represents the Discord Bot List service
 * @see https://discordbotlist.com/api-docs
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class DiscordBotList extends ServiceBase {
  static get baseURL() {
    return 'https://discordbotlist.com';
  }

  /**
   * Gets the widget for this bot
   * @param {string} id The bot's ID.
   */
  getBotWidget(id) {
    return this._request({ url: `/bots/${id}/widget` });
  }
}

module.exports = DiscordBotList;
