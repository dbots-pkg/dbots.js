const ServiceBase = require('../ServiceBase');

/**
 * Represents the Glenn Bot List service
 * @see https://docs.glennbotlist.xyz/
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class GlennBotList extends ServiceBase {
  /**
   * Gets the bot listed for this service
   * @param {string} id The bot's ID.
   */
  getBot(id) {
    return this._request({ url: `https://glennbotlist.xyz/api/v2/bot/${id}` });
  }

  /**
   * Gets the bot's stats on this service
   * @param {string} id The bot's ID.
   */
  getBotStats(id) {
    return this._request({ url: `https://glennbotlist.xyz/api/v2/bot/${id}` }, true);
  }

  /**
   * Get a user's profile listed on this service
   * @param {string} id The user's ID.
   */
  getProfile(id) {
    return this._request({ url: `https://glennbotlist.xyz/api/v2/profile/${id}` });
  }
}

module.exports = GlennBotList;
