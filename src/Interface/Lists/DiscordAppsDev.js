const ServiceBase = require('../ServiceBase');

/**
 * Represents the discordapps.dev's service
 * @see https://discordapps.dev/en-GB/posts/docs/api-v2/
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class DiscordAppsDev extends ServiceBase {
  static get baseURL() {
    return 'https://api.discordapps.dev/api/v2';
  }

  static post({ token, clientID, serverCount }) {
    return super._post({
      method: 'post',
      url: `/bots/${clientID}`,
      headers: { Authorization: token },
      data: { bot: { count: serverCount } }
    });
  }

  /**
   * Gets a list of bots on this service
   */
  getBots() {
    return this._request({ url: '/bots' });
  }

  /**
   * Gets a list of applications on this service
   */
  getApps() {
    return this._request({ url: '/apps' });
  }

  /**
   * Gets a list of RPC applications on this service
   */
  getRPCApps() {
    return this._request({ url: '/rpc' });
  }

  /**
   * Gets the bot listed for this service
   * @param {string} id The bot's ID.
   */
  getBot(id) {
    return this._request({ url: `/bots/${id}` });
  }
}

module.exports = DiscordAppsDev;
