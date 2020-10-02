const ServiceBase = require('../ServiceBase');
const Util = require('../../Utils/Util');

/**
 * Represents the Discord Apps service.
 * @see https://discordapps.dev/en-GB/posts/docs/api-v2/
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class DiscordAppsDev extends ServiceBase {
  static get aliases() {
    return ['discordappsdev', 'discordapps.dev', 'discordapps', 'dapps'];
  }

  static get logoURL() {
    return 'https://api.discordapps.dev/img/logo/logo128.png';
  }

  static get name() {
    return 'Discord Apps';
  }

  static get websiteURL() {
    return 'https://discordapps.dev';
  }

  static get baseURL() {
    return 'https://api.discordapps.dev/api/v2';
  }

  /**
   * Posts statistics to this service.
   * <warn>Shard data posting is not supported for this service.</warn>
   * @param {Object} options The options of the request
   * @param {string} options.token The Authorization token for the request
   * @param {IDResolvable} options.clientID The client ID that the request will post for
   * @param {CountResolvable} options.serverCount The amount of servers that the client is in
   * @returns {Promise<AxiosResponse>}
   */
  static post({ token, clientID, serverCount }) {
    return super._post({
      method: 'post',
      url: `/bots/${Util.resolveID(clientID)}`,
      headers: { Authorization: token },
      data: { bot: { count: Util.resolveCount(serverCount) } }
    });
  }

  /**
   * Gets a list of bots on this service.
   * @returns {Promise<AxiosResponse>}
   */
  getBots() {
    return this._request({ url: '/bots' });
  }

  /**
   * Gets a list of applications on this service.
   * @returns {Promise<AxiosResponse>}
   */
  getApps() {
    return this._request({ url: '/apps' });
  }

  /**
   * Gets a list of RPC applications on this service.
   * @returns {Promise<AxiosResponse>}
   */
  getRPCApps() {
    return this._request({ url: '/rpc' });
  }

  /**
   * Gets the bot listed on this service.
   * @param {IDResolvable} id The bot's ID
   * @returns {Promise<AxiosResponse>}
   */
  getBot(id) {
    return this._request({ url: `/bots/${Util.resolveID(id)}` });
  }

  /**
   * Updates the bot with the data provided.
   * @param {IDResolvable} id The bot's ID
   * @param {Object} data The data being posted
   * @returns {Promise<AxiosResponse>}
   */
  updateBot(id, data) {
    return this._request({
      method: 'post',
      url: `/bots/${Util.resolveID(id)}`,
      headers: { Authorization: this.token },
      data
    }, {
      requiresToken: true
    });
  }
}

module.exports = DiscordAppsDev;
