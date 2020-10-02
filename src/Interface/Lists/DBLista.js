const ServiceBase = require('../ServiceBase');
const { Error } = require('../../Utils/DBotsError');
const Util = require('../../Utils/Util');

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
   * <warn>This service does not support posting.
   * This function is defined to properly return an error if improperly used to post.</warn>
   * @private
   * @returns {Promise<void>}
   */
  static post() {
    return Promise.reject(new Error('POSTING_UNSUPPORTED', this.name));
  }

  /**
   * Adds a bot to the service.
   * @param {Object} data The data being posted. This should include the ID of the bot
   * @returns {Promise<AxiosResponse>}
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
   * @returns {Promise<AxiosResponse>}
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
   * @param {IDResolvable} id The bot's ID
   * @returns {Promise<AxiosResponse>}
   */
  getBot(id) {
    return this._request({ url: `/bots/${Util.resolveID(id)}` });
  }

  /**
   * Gets a list of bots on this service.
   * @param {CountResolvable} [page] The page you want to get
   * @returns {Promise<AxiosResponse>}
   */
  getBots(page = 0) {
    return this._request({ url: `/bots/list/${Util.resolveCount(page)}` });
  }

  /**
   * Gets a list of unverified bots on this service.
   * @returns {Promise<AxiosResponse>}
   */
  getUnverifiedBots() {
    return this._request({ url: '/bots/list/unverified' });
  }

  /**
   * Gets a list of rejected bots on this service.
   * @returns {Promise<AxiosResponse>}
   */
  getRejectedBots() {
    return this._request({ url: '/bots/list/rejected' });
  }

  /**
   * Adds a rating to a bot on the service.
   * @param {IDResolvable} id The bot's ID
   * @param {Object} data The data being posted
   * @returns {Promise<AxiosResponse>}
   */
  rateBot(id, data) {
    return this._request({
      method: 'post',
      url: `/bots/${Util.resolveID(id)}/rate`,
      headers: { Authorization: this.token },
      data
    }, {
      requiresToken: true
    });
  }

  /**
   * Removes a rating from a bot on the service.
   * @param {IDResolvable} id The bot's ID
   * @returns {Promise<AxiosResponse>}
   */
  removeRating(id) {
    return this._request({
      method: 'delete',
      url: `/bots/${Util.resolveID(id)}/rate`,
      headers: { Authorization: this.token }
    }, {
      requiresToken: true
    });
  }

  /**
   * Removes a bot from the service.
   * @param {IDResolvable} id The bot's ID
   * @returns {Promise<AxiosResponse>}
   */
  removeBot(id) {
    return this._request({
      method: 'delete',
      url: `/bots/${Util.resolveID(id)}`,
      headers: { Authorization: this.token }
    }, {
      requiresToken: true
    });
  }

  /**
   * Searches for bots on the service.
   * @param {string} query The query to search for
   * @returns {Promise<AxiosResponse>}
   */
  search(query) {
    return this._request({ url: `/bots/search/${encodeURIComponent(query)}` });
  }
}

module.exports = DBLista;
