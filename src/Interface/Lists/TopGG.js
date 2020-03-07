const ServiceBase = require('../ServiceBase');

/**
 * Represents the top.gg (formerly discordbots.org) service
 * @see https://top.gg/api/docs
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class TopGG extends ServiceBase {
  static get baseURL() {
    return 'https://top.gg/api';
  }

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
   * Gets the user listed for this service
   * @param {string} id The user's ID.
   */
  getUser(id) {
    return this._request({ url: `/users/${id}` });
  }

  /**
   * Gets the list of bots listed for this service
   */
  getBots() {
    return this._request({ url: '/bots' });
  }

  /**
   * Gets the bot listed for this service
   * @param {string} id The bot's ID.
   */
  getBot(id) {
    return this._request({ url: `/bots/${id}` });
  }

  /**
   * Gets the bot's stats listed on this service
   * @param {string} id The bot's ID.
   */
  getBotStats(id) {
    return this._request({ url: `/bots/${id}/stats` });
  }

  /**
   * Gets the data on the voters for this bot
   * @param {string} id The bot's ID.
   * @param {Object} query The querystring that will be used in the request
   */
  getBotVotes(id, query) {
    return this._request({ url: `/bots/${id}/votes`, params: query });
  }

  /**
   * Gets the embed picture for this bot
   * @param {string} id The bot's ID.
   * @param {Object} query The querystring that will be used in the request
   */
  getBotEmbed(id, query) {
    return this._request({ url: `/widget/${id}.png`, params: query });
  }
}

module.exports = TopGG;
