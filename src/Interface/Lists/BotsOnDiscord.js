const ServiceBase = require('../ServiceBase');

/**
 * Represents the Bots On Discord service
 * @see https://bots.ondiscord.xyz/info/api
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class BotsOnDiscord extends ServiceBase {
  /**
   * Checks whether or not a user has reviewed a bot
   * @param {string} id The bot's ID.
   * @param {string} userId The user's ID.
   */
  checkReview(id, userId) {
    return this._request({
      url: `https://bots.ondiscord.xyz/bot-api/bots/${id}/review`,
      params: { owner: userId }
    }, true);
  }
}

module.exports = BotsOnDiscord;
