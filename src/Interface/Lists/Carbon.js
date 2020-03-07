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

  static post({ token, serverCount }) {
    return super._post({
      method: 'post',
      url: '/data/botdata.php',
      data: { key: token, servercount: serverCount }
    });
  }

  /**
   * Gets a list of bots on this service
   */
  getBots() {
    return this._request({ url: '/api/listedbots' });
  }
}

module.exports = Carbon;
