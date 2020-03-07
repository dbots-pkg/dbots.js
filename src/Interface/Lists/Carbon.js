const ServiceBase = require('../ServiceBase');

/**
 * Represents the Carbonitex service
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
class Carbon extends ServiceBase {
  static get aliases() {
    return ['carbonitex', 'carbonitex.net', 'carbon'];
  }

  static get logoURL() {
    return 'https://get.snaz.in/7N8ywwr.png';
  }
  
  static get name() {
    return 'Carbonitex';
  }

  static get websiteURL() {
    return 'https://www.carbonitex.net';
  }

  static get baseURL() {
    return 'https://www.carbonitex.net/discord';
  }

  /**
   * Posts statistics to this service
   * @param {Object} options The options of the request
   * @param {string} options.token The Authorization token for the request (this automatically determines what client its posting for)
   * @param {number} options.serverCount The amount of servers that the client is in
   * @returns {Promise}
   */

  static post({ token, serverCount }) {
    return super._post({
      method: 'post',
      url: '/data/botdata.php',
      data: { key: token, servercount: serverCount }
    });
  }

  /**
   * Gets a list of bots on this service
   * @returns {Promise}
   */
  getBots() {
    return this._request({ url: '/api/listedbots' });
  }
}

module.exports = Carbon;
