const ServiceBase = require('../ServiceBase');

/**
 * Represents the divinediscordbots.com's service
 * @see https://divinediscordbots.com/api
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class DivineDiscordBots extends ServiceBase {
  static get baseURL() {
    return 'https://divinediscordbots.com';
  }

  static post({ token, clientID, serverCount }) {
    return super._post({
      method: 'post',
      url: `/bot/${clientID}/stats`,
      headers: { Authorization: token },
      data: { server_count: serverCount }
    });
  }

  /**
   * Gets the bot stats for your bot
   * @param {string} id The bot's ID.
   */
  getBotStats(id) {
    return this._request({ url: `/bot/${id}/stats` });
  }

  /**
   * Gets the bot votes for your bot
   * @param {string} id The bot's ID.
   */
  getBotVotes(id) {
    return this._request({ url: `/bot/${id}/votes` });
  }
}

module.exports = DivineDiscordBots;
