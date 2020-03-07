const ServiceBase = require('../ServiceBase');

/**
 * Represents the bots.discord.pw service
 * @see https://discord.bots.gg/docs
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class DiscordBotsGG extends ServiceBase {
  /**
   * Gets the bot listed for this service
   * @param {string} id The bot's ID.
   * @param {Boolean} [sanitized=false] Whether to sanitize descriptions
   */
  getBot(id, sanitized = false) {
    return this._request({
      url: `https://discord.bots.gg/api/v1/bots/${id}`,
      headers: { Authorization: this.token },
      query: { sanitized }
    }, true);
  }

  /**
   * Gets a list of bots on this service
   * @param {?Object} query The query string object to append to the endpoint
   */
  getBots(query) {
    return this._request({
      url: 'https://discord.bots.gg/api/v1/bots',
      headers: { Authorization: this.token },
      params: query
    }, true);
  }
}

module.exports = DiscordBotsGG;
