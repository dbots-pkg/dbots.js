const ServiceBase = require('../ServiceBase');
const Util = require('../../Utils/Util');

/**
 * Represents the Bots Of Discord service.
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class BotsOfDiscord extends ServiceBase {
  static get aliases() {
    return ['botsofdiscord', 'b-o-d', 'b-o-d.cf'];
  }

  static get logoURL() {
    return 'https://i.olsh.me/icon?size=1..100..500&url=b-o-d.cf';
  }

  static get name() {
    return 'Bots Of Discord';
  }

  static get websiteURL() {
    return 'https://www.b-o-d.cf/';
  }

  static get baseURL() {
    return 'https://www.b-o-d.cf/api';
  }

  /**
   * Posts statistics to this service.
   * @param {Object} options The options of the request
   * @param {string} options.token The Authorization token for the request (this automatically determines what client its posting for)
   * @param {CountResolvable} options.serverCount The amount of servers that the client is in
   * @param {Shard} options.shard The shard the request is representing
   * @returns {Promise<AxiosResponse>}
   */
  static post({ token, serverCount, shard }) {
    return super._post({
      method: 'post',
      url: '/bots/stats',
      headers: { Authorization: token },
      data: shard ? 
        { server_count: Util.resolveCount(serverCount),
          shard_count: shard.count } : 
        { server_count: Util.resolveCount(serverCount) }
    });
  }

  /**
   * Gets the bot's stats on this service.
   * @param {IDResolvable} id The bot's ID
   * @returns {Promise<AxiosResponse>}
   */
  getBotStats(id) {
    return this._request({ url: `/bots/${Util.resolveID(id)}/stats` });
  }

  /**
   * Gets the user listed on this service.
   * @param {IDResolvable} id The user's ID
   * @returns {Promise<AxiosResponse>}
   */
  getUser(id) {
    return this._request({ url: `/users/${Util.resolveID(id)}` });
  }

  /**
   * Gets the list of people who voted this bot on this service.
   * @returns {Promise<AxiosResponse>}
   */
  getBotVotes() {
    return this._request({
      url: '/bots/votes',
      headers: { Authorization: this.token }
    }, {
      requiresToken: true
    });
  }
}

module.exports = BotsOfDiscord;
