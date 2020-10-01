const ServiceBase = require('../ServiceBase');
const Util = require('../../Utils/Util');

/**
 * Represents the DiscordBots.co service.
 * @see https://discordbots.co/api
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class DiscordBotsCo extends ServiceBase {
  static get aliases() {
    return ['discordbotsco'];
  }

  static get logoURL() {
    return 'https://cdn.discordapp.com/avatars/688927563409522694/17cfd572fd3e2d3285534c12e0f58422.png';
  }

  static get name() {
    return 'DiscordBots.co';
  }

  static get websiteURL() {
    return 'https://discordbots.co';
  }

  static get baseURL() {
    return 'https://api.discordbots.co/v1/public';
  }

  /**
   * Posts statistics to this service.
   * @param {Object} options The options of the request
   * @param {string} options.token The Authorization token for the request
   * @param {IDResolvable} options.clientID The client ID that the request will post for
   * @param {CountResolvable} options.serverCount The amount of servers that the client is in
   * @param {Shard} options.shard The shard the request is representing
   * @returns {Promise<AxiosResponse>}
   */
  static post({ token, clientID, serverCount, shard }) {
    return super._post({
      method: 'post',
      url: `/bot/${Util.resolveID(clientID)}/stats`,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      data: shard ?
        {
          serverCount: Util.resolveCount(serverCount),
          shardCount: shard.count
        } :
        { serverCount: Util.resolveCount(serverCount) }
    });
  }

  /**
   * Gets the bot listed on this service.
   * @param {IDResolvable} id The bot's ID
   * @returns {Promise<AxiosResponse>}
   */
  getBot(id) {
    return this._request({
      url: `/bot/${Util.resolveID(id)}`,
      headers: { Authorization: this.token }
    }, {
      requiresToken: true
    });
  }
}

module.exports = DiscordBotsCo;
