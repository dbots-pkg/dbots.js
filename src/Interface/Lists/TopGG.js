const ServiceBase = require('../ServiceBase');

/**
 * Represents the Top.gg service.
 * @see https://top.gg/api/docs
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class TopGG extends ServiceBase {
  static get aliases() {
    return ['topgg', 'top.gg', 'top'];
  }

  static get logoURL() {
    return 'https://top.gg/images/dblnew.png';
  }

  static get name() {
    return 'Top.gg';
  }

  static get websiteURL() {
    return 'https://top.gg';
  }

  static get baseURL() {
    return 'https://top.gg/api';
  }

  /**
   * Posts statistics to this service.
   * @param {Object} options The options of the request
   * @param {string} options.token The Authorization token for the request
   * @param {string} options.clientID The client ID that the request will post for
   * @param {number} options.serverCount The amount of servers that the client is in
   * @param {Shard} options.shard The shard the request is representing
   * @returns {Promise}
   */
  static post({ token, clientID, serverCount, shard }) {
    return super._post({
      method: 'post',
      url: `/bots/${clientID}/stats`,
      headers: { Authorization: token },
      data: shard ? 
        { server_count: serverCount, shard_id: shard.id, shard_count: shard.count } : 
        { server_count: serverCount }
    });
  }

  /**
   * Gets the user listed on this service.
   * @param {string} id The user's ID
   * @returns {Promise}
   */
  getUser(id) {
    return this._request({ url: `/users/${id}` });
  }

  /**
   * Gets the list of bots on this service.
   * @returns {Promise}
   */
  getBots() {
    return this._request({ url: '/bots' });
  }

  /**
   * Gets the bot listed on this service.
   * @param {string} id The bot's ID
   * @returns {Promise}
   */
  getBot(id) {
    return this._request({ url: `/bots/${id}` });
  }

  /**
   * Gets the bot's stats listed on this service.
   * @param {string} id The bot's ID
   * @returns {Promise}
   */
  getBotStats(id) {
    return this._request({ url: `/bots/${id}/stats` });
  }

  /**
   * Gets the list of people who votes this bot on this service.
   * @param {string} id The bot's ID
   * @param {Object} query The query string that will be used in the request
   * @returns {Promise}
   */
  getBotVotes(id, query) {
    return this._request({ url: `/bots/${id}/votes`, params: query });
  }

  /**
   * Gets the widget URL for this bot.
   * @param {string} id The bot's ID
   * @param {Object} [query] The query string that will be used in the request
   * @returns {string}
   */
  getBotWidget(id, query) {
    return this._appendQuery(`/widget/${id}.png`, query);
  }
}

module.exports = TopGG;
