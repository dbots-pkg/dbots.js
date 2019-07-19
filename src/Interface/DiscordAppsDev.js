const ServiceBase = require('./ServiceBase')

/**
 * Represents the discordapps.dev's service
 * @see https://discordapps.dev/en-GB/posts/docs/api-v2/
 */
class DiscordAppsDev extends ServiceBase {
  /**
   * Tests the initialized token
   * @param {string} id The ID of a bot that the token is in control of.
   */
  test(id){
    return this._request({
      url: `https://api.discordapps.dev/api/v2/test/${id}`,
      headers: { Authorization: this.token }
    }, true)
  }

  /**
   * Gets a list of bots on this service
   */
  getBots(){
    return this._request({ url: `https://api.discordapps.dev/api/v2/bots` });
  }

  /**
   * Gets a list of applications on this service
   */
  getApps(){
    return this._request({ url: `https://api.discordapps.dev/api/v2/apps` });
  }

  /**
   * Gets a list of RPC applications on this service
   */
  getRPCApps(){
    return this._request({ url: `https://api.discordapps.dev/api/v2/rpc` });
  }

  /**
   * Gets the bot listed for this service
   * @param {string} id The bot's ID.
   */
  getBot(id){
    return this._request({ url: `https://api.discordapps.dev/api/v2/bots/${id}` });
  }
}

module.exports = DiscordAppsDev;