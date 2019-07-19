const ServiceBase = require('./ServiceBase')

/**
 * Represents the divinediscordbots.com's service
 * @see https://divinediscordbots.com/api
 */
class DivineDiscordBots extends ServiceBase {
  /**
   * Gets the bot stats for your bot
   * @param {string} id The bot's ID.
   */
  getBotStats(id){
    return this._request({ url: `https://divinediscordbots.com/bot/${id}/stats` });
  }

  /**
   * Gets the bot votes for your bot
   * @param {string} id The bot's ID.
   */
  getBotVotes(id){
    return this._request({ url: `https://divinediscordbots.com/bot/${id}/votes` });
  }
}

module.exports = DivineDiscordBots;