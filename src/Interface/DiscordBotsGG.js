const ServiceBase = require('./ServiceBase')

/**
 * Represents the bots.discord.pw service
 * @see https://discord.bots.gg/docs
 */
class DiscordBotsGG extends ServiceBase {
  /**
   * Gets the bot listed for this service
   * @param {string} id The bot's ID.
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
   */
  getBots(query) {
    return this._request({
      url: `https://discord.bots.gg/api/v1/bots`,
      headers: { Authorization: this.token },
      params: query
    }, true);
  }
}

module.exports = DiscordBotsGG;