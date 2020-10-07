const axios = require('axios');
const { Package } = require('./Constants');

/*
{
  method: '',
  url: '',
  headers: { ... },
  data: { ... }
}
*/

/**
 * @typedef {Object.<string, any>} AxiosResponse
 * @see {@link https://github.com/axios/axios#response-schema}
 */

/** 
 * @typedef {Object} RequestForm
 * @property {string} method The method to use
 * @property {string} url The URL for the request
 * @property {Object.<string, string>} headers The headers to append to the request
 * @property {Object.<string, string|number>} data The data to send with the request, if the method allows it
 * @property {Object.<string, string|number>} params The query parameters for the request
 * @private
 */

/** 
 * Returns a request.
 * @param {RequestForm} options An object containing the config for the request: only basic properties are documented, but all [Axios](https://github.com/axios/axios#request-config) parameters are valid
 * @returns {Promise<AxiosResponse>} The request
 */
function FormatRequest(options) {
  if (!options.method) options.method = 'get';
  if (options.body) {
    options.data = options.body;
    delete options.body;
  }
  if (options.query) {
    options.params = options.query;
    delete options.query;
  }
  const userAgent = `dbots (https://github.com/dbots-pkg/dbots.js ${Package.version}) Node.js/${process.version}`;
  if (!options.headers)
    options.headers = {
      'User-Agent': userAgent
    };
  else if (!options.headers['User-Agent'])
    options.headers['User-Agent'] = userAgent;
  return axios(options);
}

module.exports = FormatRequest;
