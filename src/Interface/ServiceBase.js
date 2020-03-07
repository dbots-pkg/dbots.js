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
   * @returns {string} The base URL of the service's API
   */
  static get baseURL() {
    return '';
  }

  /**
   * Sends a request for the service interface
   * @param {Object} form The request form
   * @param {boolean} [requiresToken] Whether the request requires a token
   * @param {boolean} [appendBaseURL] Whether to append the service's base API url
   * @private
   */
  _request(form, requiresToken = false, appendBaseURL = true) {
    if (requiresToken && !this.token) throw new Error('This function requires a token');
    if (this.constructor.baseURL && appendBaseURL)
      form.url = this.constructor.baseURL + form.url;
    return FormatRequest(form);
  }
}

module.exports = ServiceBase;
