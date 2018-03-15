const ServiceBase = require('./ServiceBase')

/**
 * Represents the bots.discord.pw service
 * @see https://bots.discord.pw/api
 */
class BotsDiscordPW extends ServiceBase {
  /**
   * Gets the user listed for this service
   * @param {string} id The user's ID.
   */
  getUser(id){
    return this._request({ url: `https://bots.discord.pw/api/users/${id}` })
  }

  /**
   * Gets the bot listed for this service
   * @param {string} id The bot's ID.
   */
  getBot(id){
    return this._request({
      url: `https://bots.discord.pw/api/bots/${id}`,
      headers: { Authorization: this.token }
    }, true);
  }

  /**
   * Gets the bot's stats listed on this service
   * @param {string} id The bot's ID.
   */
  getBotStats(id){
    return this._request({
      url: `https://bots.discord.pw/api/bots/${id}/stats`,
      headers: { Authorization: this.token }
    }, true);
  }

  /**
   * Gets a list of bots on this service
   */
  getBots(){
    return this._request({
      url: `https://bots.discord.pw/api/bots`,
      headers: { Authorization: this.token }
    }, true);
  }
}

module.exports = BotsDiscordPW;