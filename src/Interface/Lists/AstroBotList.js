const ServiceBase = require('../ServiceBase');
const Util = require('../../Utils/Util');

/**
 * Represents the Astro Bot List service.
 * @see https://botlists.com/profile/api#docs
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class AstroBotList extends ServiceBase {
  static get aliases() {
    return [
      'astrobotlist',
      'botlists.com'
    ];
  }

  static get logoURL() {
    return 'https://cdn.bot-list.xyz/7364djcas.png';
  }

  static get name() {
    return 'Astro Bot List';
  }

  static get websiteURL() {
    return 'https://botlists.com';
  }

  static get baseURL() {
    return 'https://botlists.com/api';
  }

  /**
   * Posts statistics to this service.
   * <warn>Shard data posting is not supported for this service.</warn>
   * @param {Object} options The options of the request
   * @param {string} options.token The Authorization token for the request
   * @param {CountResolvable} options.serverCount The amount of servers that the client is in
   * @returns {Promise<AxiosResponse>}
   */
  static post({ token, serverCount }) {
    return super._post({
      method: 'post',
      url: '/bot',
      headers: { token },
      data: {
        guild_count: Util.resolveCount(serverCount),
      }
    });
  }
}

module.exports = AstroBotList;
