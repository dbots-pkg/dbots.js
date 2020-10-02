const ServiceBase = require('../ServiceBase');
const Util = require('../../Utils/Util');

/**
 * Represents the TopCord service.
 * @see https://docs.topcord.xyz/#/API
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class TopCord extends ServiceBase {
  static get aliases() {
    return ['topcord', 'topcord.xyz'];
  }

  static get logoURL() {
    return 'https://avatars0.githubusercontent.com/u/69593894?v=4';
  }

  static get name() {
    return 'TopCord';
  }

  static get websiteURL() {
    return 'https://topcord.xyz/';
  }

  static get baseURL() {
    return 'https://topcord.xyz/api';
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
      url: `/bot/stats/${Util.resolveID(clientID)}`,
      headers: { Authorization: token },
      data: shard ?
        {
          guilds: Util.resolveCount(serverCount),
          shards: shard.count
        } :
        { guilds: Util.resolveCount(serverCount) }
    });
  }

  /**
   * Gets the bot listed on this service.
   * @param {IDResolvable} id The bot's ID
   * @returns {Promise<AxiosResponse>}
   */
  getBot(id) {
    return this._request({ url: `/bot/${Util.resolveID(id)}` });
  }
}

module.exports = TopCord;
