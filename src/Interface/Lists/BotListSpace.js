const ServiceBase = require('../ServiceBase');

/**
 * Represents the botlist.space's service
 * @see https://docs.botlist.space/
 * @extends {ServiceBase}
 * @constructor
 * @param {string} token The token/key for the service
 */
class BotListSpace extends ServiceBase {
  /**
   * Gets the statistics of this service
   */
  getStatistics() {
    return this._request({ url: 'https://api.botlist.space/v1/statistics' });
  }

  /**
   * Gets a list of bots on this service
   */
  getBots() {
    return this._request({ url: 'https://api.botlist.space/v1/bots' });
  }

  /**
   * Gets the bot listed for this service
   * @param {string} id The bot's ID.
   */
  getBot(id) {
    return this._request({ url: `https://api.botlist.space/v1/bots/${id}` });
  }

  /**
   * Gets the data on the voters for this bot
   * @param {string} id The bot's ID.
   */
  getBotVotes(id) {
    return this._request({
      url: `https://api.botlist.space/v1/bots/${id}/upvotes`,
      headers: { Authorization: this.token }
    }, true);
  }

  /**
   * Gets the uptime of a bot listed for this service
   * @param {string} id The bot's ID.
   */
  getBotUptime(id) {
    return this._request({ url: `https://api.botlist.space/v1/bots/${id}/uptime` });
  }

  /**
   * Gets the user listed for this service
   * @param {string} id The user's ID.
   */
  getUser(id) {
    return this._request({ url: `https://api.botlist.space/v1/users/${id}` });
  }

  /**
   * Gets the user's bots listed for this service
   * @param {string} id The user's ID.
   */
  getUserBots(id) {
    return this._request({ url: `https://api.botlist.space/v1/users/${id}/bots` });
  }
}

module.exports = BotListSpace;
