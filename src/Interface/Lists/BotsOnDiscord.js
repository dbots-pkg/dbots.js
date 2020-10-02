const ServiceBase = require('../ServiceBase');
const Util = require('../../Utils/Util');

/**
 * Represents the Bots On Discord service.
 * @see https://bots.ondiscord.xyz/info/api
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class BotsOnDiscord extends ServiceBase {
  static get aliases() {
    return ['botsondiscord', 'bots.ondiscord.xyz', 'bod'];
  }

  static get logoURL() {
    return 'https://i.olsh.me/icon?size=1..100..500&url=bots.ondiscord.xyz';
  }
  
  static get name() {
    return 'Bots On Discord';
  }

  static get websiteURL() {
    return 'https://bots.ondiscord.xyz';
  }

  static get baseURL() {
    return 'https://bots.ondiscord.xyz/bot-api';
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
      url: `/bots/${Util.resolveID(clientID)}/guilds`,
      headers: { Authorization: token },
      data: { guildCount: Util.resolveCount(serverCount) }
    });
  }

  /**
   * Checks whether or not a user has reviewed a bot.
   * @param {IDResolvable} id The bot's ID
   * @param {IDResolvable} userId The user's ID
   * @returns {Promise<AxiosResponse>}
   */
  checkReview(id, userId) {
    return this._request({
      url: `/bots/${Util.resolveID(id)}/review`,
      headers: { Authorization: this.token },
      params: { owner: Util.resolveID(userId) }
    }, {
      requiresToken: true
    });
  }

  /**
   * Gets the widget URL for this bot.
   * @param {IDResolvable} id The bot's ID
   * @param {Query} [query] The query string that will be used in the request
   * @returns {string}
   */
  getWidgetURL(id, query) {
    return this._appendQuery(`https://bots.ondiscord.xyz/bots/${Util.resolveID(id)}/embed`, query, false);
  }
}

module.exports = BotsOnDiscord;
