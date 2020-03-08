const ServiceBase = require('../ServiceBase');

/**
 * Represents the Arcane Bot Center service
 * @see https://arcane-botcenter.xyz/documentation
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class Arcane extends ServiceBase {
  static get aliases() {
    return ['arcanebotcenter', 'arcane-botcenter.xyz', 'arcanebotcenter.xyz', 'arcane', 'abc'];
  }

  static get logoURL() {
    return 'https://i.olsh.me/icon?size=1..100..500&url=arcane-botcenter.xyz';
  }

  static get name() {
    return 'Arcane Bot List';
  }

  static get websiteURL() {
    return 'https://arcane-botcenter.xyz';
  }

  static get baseURL() {
    return 'https://arcane-botcenter.xyz/api';
  }

  /**
   * Posts statistics to this service
   * @param {Object} options The options of the request
   * @param {string} options.token The Authorization token for the request
   * @param {string} options.clientID The client ID that the request will post for
   * @param {number} options.serverCount The amount of servers that the client is in
   * @param {number} options.userCount The amount of users that the client cached
   * @param {Shard} options.shard The shard the request is representing
   * @returns {Promise}
   */
  static post({ token, clientID, serverCount, userCount, shard }) {
    return super._post({
      method: 'post',
      url: `/${clientID}/stats`,
      headers: { Authorization: token },
      data: shard ? 
        { server_count: serverCount, member_count: userCount, shard_count: shard.count } : 
        { server_count: serverCount, member_count: userCount }
    });
  }
}

module.exports = Arcane;
