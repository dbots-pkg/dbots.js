const FormatRequest = require('../Utils/FormatRequest');

/**
 * Represents a service
 * @constructor
 * @param {string} token The token/key for the service
 */
class ServiceBase {
  constructor(token) {
    /**
     * The token that will be used for the service
     * @type {string}
     * @private
     */
    this.token = token;
  }

  /**
   * Sends a request for the service interface
   * @param {Object} form The request form
   * @param {boolean} [requiresToken] Whether the request requires a token
   * @private
   */
  _request(form, requiresToken) {
    if (requiresToken && !this.token) throw new Error('This function requires a token');
    return FormatRequest(form);
  }
}

module.exports = ServiceBase;
