const ServiceBase = require('../ServiceBase');
const Util = require('../../Utils/Util');

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
   * @param {IDResolvable} options.clientID The client ID that the request will post for
   * @param {CountResolvable} options.serverCount The amount of servers that the client is in
   * @param {Shard} options.shard The shard the request is representing
   * @returns {Promise<AxiosResponse>}
   */
  static post({ token, clientID, serverCount, shard }) {
    return super._post({
      method: 'post',
      url: `/bots/${Util.resolveID(clientID)}/stats`,
      headers: { Authorization: token },
      data: shard ? 
        { server_count: Util.resolveCount(serverCount),
          shard_id: shard.id,
          shard_count: shard.count } : 
        { server_count: Util.resolveCount(serverCount) }
    });
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
   * Gets the list of bots on this service.
   * @param {Query} query The query string that will be used in the request
   * @returns {Promise<AxiosResponse>}
   */
  getBots(query) {
    return this._request({ url: '/bots', params: query });
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
   * Gets the bot's stats listed on this service.
   * @param {IDResolvable} id The bot's ID
   * @returns {Promise<AxiosResponse>}
   */
  getBotStats(id) {
    return this._request({ url: `/bots/${Util.resolveID(id)}/stats` });
  }

  /**
   * Gets the list of people who voted this bot on this service.
   * @param {IDResolvable} id The bot's ID
   * @param {Query} query The query string that will be used in the request
   * @returns {Promise<AxiosResponse>}
   */
  getBotVotes(id, query) {
    return this._request({ url: `/bots/${Util.resolveID(id)}/votes`, params: query });
  }

  /**
   * Checks whether or not a user has voted for a bot on this service.
   * @param {IDResolvable} id The bot's ID
   * @param {IDResolvable} userID The user's ID
   * @returns {Promise<AxiosResponse>}
   */
  userVoted(id, userID) {
    return this._request({
      url: `/bots/${Util.resolveID(id)}/check`,
      params: { userId: userID }
    });
  }

  /**
   * Gets the widget URL for this bot.
   * @param {IDResolvable} id The bot's ID
   * @param {Query} [query] The query string that will be used in the request
   * @param {string} [smallWidget] The sub-path name to turn the widget into a badge (i.e. owner)
   * @returns {string}
   */
  getWidgetURL(id, query, smallWidget = null) {
    const subPath = smallWidget ? `${smallWidget}/` : '';
    return this._appendQuery(`/widget/${subPath}${Util.resolveID(id)}.svg`, query);
  }
}

module.exports = TopGG;
