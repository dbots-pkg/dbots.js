const ServiceBase = require('../ServiceBase');

/**
 * Represents the Discord Bot List service
 * @see https://discordbotlist.com/api-docs
 * @extends {ServiceBase}
 */
class DiscordBotList extends ServiceBase {
  /**
   * Gets the widget for this bot
   * @param {string} id The bot's ID.
   */
  getBotWidget(id) {
    return this._request({ url: `https://discordbotlist.com/bots/${id}/widget` });
  }
}

module.exports = DiscordBotList;
