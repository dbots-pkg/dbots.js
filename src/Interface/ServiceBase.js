const FormatRequest = require('../Utils/FormatRequest');
const { Error } = require('../Utils/DBotsError');
const buildURL = require('axios/lib/helpers/buildURL');

/**
 * Represents a basic service.
 */
class ServiceBase {
  /**
   * @param {string} token The token/key for the service
   */
  constructor(token) {
    /**
     * The token that will be used for the service.
     * @type {string}
     * @private
     */
    this.token = token;
  }

  /**
   * The base URL of the service's API.
   * @type {string}
   * @readonly
   */
  static get baseURL() {
    return '';
  }

  /**
   * Gets a service from a key.
   * @param {string} key The name of the service to get
   * @param {Array<CustomService>} [extras] An array of {@link CustomService}s to include
   * @returns {?ServiceBase}
   */
  static get(key, extras = []) {
    if (!key || typeof key !== 'string')
      return null;
    const services = [
      ...Object.values(serviceClasses),
      ...extras
    ];
    for (let i = 0, len = services.length; i < len; i++) {
      const service = services[i];
      if (!service || !service.aliases || !service.post)
        continue;
      if (service.aliases.includes(key.toLowerCase()))
        return service;
    }
    return null;
  }

  /**
   * Gets every loaded service.
   * @returns {Object<string, ServiceBase>}
   */
  static getAll() {
    return serviceClasses;
  }

  /**
   * Posts statistics to this service.
   * Internally, this is supposed to be used in extended classes.
   * @param {RequestForm} form The request form
   * @param {boolean} [appendBaseURL] Whether to append the service's base API url
   * @private
   * @returns {Promise<AxiosResponse>}
   */
  static _post(form, appendBaseURL = true) {
    if (this.name === 'ServiceBase')
      return Promise.reject(new Error('CALLED_FROM_BASE'));
    if (this.baseURL && appendBaseURL)
      form.url = this.baseURL + form.url;
    return FormatRequest(form);
  }

  /**
   * Sends a request for the service interface.
   * @param {RequestForm} form The request form
   * @param {Object} options The options of this request
   * @param {boolean} [options.requiresToken] Whether the request requires a token
   * @param {boolean} [options.appendBaseURL] Whether to prepend the service's base API url
   * @private
   * @returns {Promise<AxiosResponse>}
   */
  _request(form, { requiresToken = false, appendBaseURL = true } = {}) {
    if (requiresToken && !this.token)
      return Promise.reject(new Error('REQUIRES_TOKEN'));
    if (this.constructor.baseURL && appendBaseURL)
      form.url = this.constructor.baseURL + form.url;
    return FormatRequest(form);
  }

  /**
   * Appends query string to a URL.
   * @param {string} url The URL to modify
   * @param {Query} query The query to append
   * @param {boolean} appendBaseURL Whether to prepend the service's base API url
   * @returns {string} The modified URL
   * @private
   */
  _appendQuery(url, query, appendBaseURL = true) {
    if (this.constructor.baseURL && appendBaseURL)
      url = this.constructor.baseURL + url;
    return buildURL(url, query);
  }

  /**
   * The values that can be used to select the service.
   * @type {Array<string>}
   * @readonly
   */
  static get aliases() {
    return [];
  }

  /**
   * The logo URL, used only for documentation.
   * @type {string}
   * @private
   * @readonly
   */
  static get logoURL() {
    return '';
  }

  /**
   * Service's name, used only for documentation.
   * @type {string}
   * @private
   * @readonly
   */
  static get name() {
    return '';
  }

  /**
   * The website URL, used only for documentation.
   * @type {string}
   * @private
   * @readonly
   */
  static get websiteURL() {
    return '';
  }
}

module.exports = ServiceBase;

// Service loading
let serviceClasses = {};
const usingNode = typeof process != 'undefined' && process.release.name == 'node';
if (!usingNode) {
  serviceClasses = require('../../.tmp/services-list');
} else {
  const path = eval('require')('path');
  const fs = eval('require')('fs');

  const listsDir = path.join(__dirname, './Lists');
  fs.readdirSync(listsDir).forEach(fileName => {
    const listClass = require(path.join(listsDir, fileName));
    if (listClass)
      serviceClasses[path.parse(fileName).name] = listClass;
  });
}

