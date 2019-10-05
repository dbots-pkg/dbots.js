const ServiceBase = require('./ServiceBase')

/**
 * Represents the listcord.com service
 * @see https://listcord.com/developers/docs
 */
class Listcord extends ServiceBase {
  /**
   * Gets the list of bots listed for this service
   * @param {number} limit The amount of IDs to list.
   * @param {number} offset The offset of the list.
   */
  getBots(limit = 20, offset = 0) {
    return this._request({ url: `https://listcord.com/api/bots/${limit}/${offset}` });
  }

  /**
   * Searches a term amongst the bots in this service
   * @param {string} q Query to search for.
   * @param {number} limit The amount of IDs to list.
   * @param {number} offset The offset of the list.
   */
  searchBots(q, limit = 20, offset = 0) {
    return this._request({ url: `https://listcord.com/api/bots/${limit}/${offset}`, params: { q } });
  }

  /**
   * Gets the bot listed for this service
   * @param {string} id The bot's ID.
   */
  getBot(id) {
    return this._request({ url: `https://listcord.com/api/bot/${id}` });
  }

  /**
   * Gets the data on the voters for this bot
   * @param {string} id The bot's ID.
   */
  getBotVotes(id) {
    return this._request({ url: `https://listcord.com/api/bot/${id}/votes` });
  }
}

module.exports = Listcord;