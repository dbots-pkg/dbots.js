const ServiceBase = require('./ServiceBase');

/**
 * Represents the top.gg (formerly discordbots.org) service
 * @see https://top.gg/api/docs
 */
class TopGG extends ServiceBase {
  /**
   * Gets the user listed for this service
   * @param {string} id The user's ID.
   */
  getUser(id) {
    return this._request({ url: `https://top.gg/api/users/${id}` });
  }

  /**
   * Gets the list of bots listed for this service
   */
  getBots() {
    return this._request({ url: `https://top.gg/api/bots` });
  }

  /**
   * Gets the bot listed for this service
   * @param {string} id The bot's ID.
   */
  getBot(id) {
    return this._request({ url: `https://top.gg/api/bots/${id}` });
  }

  /**
   * Gets the bot's stats listed on this service
   * @param {string} id The bot's ID.
   */
  getBotStats(id) {
    return this._request({ url: `https://top.gg/api/bots/${id}/stats` });
  }

  /**
   * Gets the data on the voters for this bot
   * @param {string} id The bot's ID.
   * @param {Object} query The querystring that will be used in the request
   */
  getBotVotes(id, query) {
    return this._request({ url: `https://top.gg/api/bots/${id}/votes`, params: query });
  }

  /**
   * Gets the embed picture for this bot
   * @param {string} id The bot's ID.
   * @param {Object} query The querystring that will be used in the request
   */
  getBotEmbed(id, query) {
    return this._request({ url: `https://top.gg/api/widget/${id}.png`, params: query });
  }
}

module.exports = TopGG;