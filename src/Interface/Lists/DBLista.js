const ServiceBase = require('../ServiceBase');
const { Error } = require('../../Utils/DBotsError');

/**
 * Represents the DBLista service.
 * @see https://docs.dblista.pl/
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class DBLista extends ServiceBase {
  static get aliases() {
    return ['dblistapl', 'dblista.pl', 'dblista'];
  }

  static get logoURL() {
    return 'https://i.olsh.me/icon?size=1..100..500&url=dblista.pl';
  }
  
  static get name() {
    return 'DBLista';
  }

  static get websiteURL() {
    return 'https://dblista.pl';
  }

  static get baseURL() {
    return 'https://api.dblista.pl/v1';
  }

  /**
   * This service does not support posting.
   * The promise returned will be rejected with an error.
   * @returns {Promise}
   */
  static post() {
    return Promise.reject(new Error('POSTING_UNSUPPORTED', this.name));
  }

  /**
   * Adds a bot to the service.
   * @param {Object} data The data being posted. This should include the ID of the bot
   * @returns {Promise}
   */
  addBot(data) {
    return this._request({
      method: 'post',
      url: '/bots',
      headers: { Authorization: this.token },
      data
    }, {
      requiresToken: true
    });
  }

  /**
   * Updates the bot's listing with the data provided.
   * @param {Object} data The data being posted. This should include the ID of the bot
   * @returns {Promise}
   */
  updateBot(data) {
    return this._request({
      method: 'put',
      url: '/bots',
      headers: { Authorization: this.token },
      data
    }, {
      requiresToken: true
    });
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
   * Gets a list of bots on this service.
   * @param {Object} [page] The page you want to get
   * @returns {Promise}
   */
  getBots(page = 0) {
    return this._request({ url: `/bots/list/${page}` });
  }

  /**
   * Gets a list of unverified bots on this service.
   * @returns {Promise}
   */
  getUnverifiedBots() {
    return this._request({ url: '/bots/list/unverified' });
  }

  /**
   * Gets a list of rejected bots on this service.
   * @returns {Promise}
   */
  getRejectedBots() {
    return this._request({ url: '/bots/list/rejected' });
  }

  /**
   * Adds a rating to a bot on the service.
   * @param {string} id The bot's ID
   * @param {Object} data The data being posted. This should include the ID of the bot
   * @returns {Promise}
   */
  rateBot(id, data) {
    return this._request({
      method: 'post',
      url: `/bots/${id}/rate`,
      headers: { Authorization: this.token },
      data
    }, {
      requiresToken: true
    });
  }

  /**
   * Removes a rating from a bot on the service.
   * @param {string} id The bot's ID
   * @returns {Promise}
   */
  removeRating(id) {
    return this._request({
      method: 'delete',
      url: `/bots/${id}/rate`,
      headers: { Authorization: this.token }
    }, {
      requiresToken: true
    });
  }

  /**
   * Removes a bot from the service.
   * @param {string} id The bot's ID
   * @returns {Promise}
   */
  removeBot(id) {
    return this._request({
      method: 'delete',
      url: `/bots/${id}`,
      headers: { Authorization: this.token }
    }, {
      requiresToken: true
    });
  }

  /**
   * Searches for bots on the service.
   * @param {string} query The query to search for
   * @returns {Promise}
   */
  search(query) {
    return this._request({ url: `/bots/search/${encodeURIComponent(query)}` });
  }
}

module.exports = DBLista;
