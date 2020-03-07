const ServiceBase = require('../ServiceBase');

/**
 * Represents the Carbonitex service
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class Carbon extends ServiceBase {
  static get baseURL() {
    return 'https://www.carbonitex.net/discord';
  }

  /**
   * Gets a list of bots on this service
   */
  getBots() {
    return this._request({ url: '/api/listedbots' });
  }
}

module.exports = Carbon;
