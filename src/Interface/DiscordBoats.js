const ServiceBase = require('./ServiceBase')

/**
 * Represents the discord.boats's service
 * @see https://discord.boats/api/docs
 */
class DiscordBoats extends ServiceBase {
  /**
   * Gets a list of bots on this service
   */
  getBots(){
    return this._request({ url: `https://api.discordapps.dev/api/v2/bots` });
  }

  /**
   * Gets the bot listed for this service
   * @param {string} id The bot's ID.
   */
  getBot(id){
    return this._request({ url: `https://api.discordapps.dev/api/v2/bots/${id}` });
  }

  /**
   * Gets the bot widget for this service
   * @param {string} id The bot's ID.
   */
  getWidget(id){
    return this._request({ url: `https://discord.boats/api/v2/widget/${id}` });
  }

  /**
   * Gets the user listed for this service
   * @param {string} id The user's ID.
   */
  getUser(id){
    return this._request({ url: `https://api.discordapps.dev/api/v2/user/${id}` });
  }

  /**
   * Whether or not a user has voted for a bot
   * @param {string} id The bot's ID.
   */
  userVoted(id, userID){
    return this._request({ url: `https://discord.boats/api/v2/bot/${id}/voted?user=${userID}` });
  }
}

module.exports = DiscordBoats;