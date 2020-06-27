const ServiceBase = require('../ServiceBase');
const Util = require('../../Utils/Util');

/**
 * Represents the Arcane Bot Center service.
 * @see https://arcane-center.xyz/documentation
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class Arcane extends ServiceBase {
  static get aliases() {
    return [
      'arcanebotcenter',
      'arcane-botcenter.xyz',
      'arcanebotcenter.xyz',
      'arcane',
      'abc',
      'arcane-center.xyz',
      'arcanecenter.xyz'
    ];
  }

  static get logoURL() {
    return 'https://i.olsh.me/icon?size=1..100..500&url=arcane-botcenter.xyz';
  }

  static get name() {
    return 'Arcane Bot List';
  }

  static get websiteURL() {
    return 'https://arcane-center.xyz';
  }

  static get baseURL() {
    return 'https://arcane-center.xyz/api';
  }

  /**
   * Posts statistics to this service.
   * @param {Object} options The options of the request
   * @param {string} options.token The Authorization token for the request
   * @param {IDResolvable} options.clientID The client ID that the request will post for
   * @param {CountResolvable} options.serverCount The amount of servers that the client is in
   * @param {CountResolvable} options.userCount The amount of users that the client cached
   * @param {Shard} options.shard The shard the request is representing
   * @returns {Promise<AxiosResponse>}
   */
  static post({ token, clientID, serverCount, userCount, shard }) {
    return super._post({
      method: 'post',
      url: `/${Util.resolveID(clientID)}/stats`,
      headers: { Authorization: token },
      data: shard ?
        {
          server_count: Util.resolveCount(serverCount),
          member_count: Util.resolveCount(userCount),
          shard_count: shard.count
        } :
        {
          server_count: Util.resolveCount(serverCount),
          member_count: Util.resolveCount(userCount)
        }
    });
  }
}

module.exports = Arcane;
