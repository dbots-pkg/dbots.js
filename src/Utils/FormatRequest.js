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
 * Returns a request.
 * @param {Object} options An object containing the config for the request: only basic properties are documented, but all [Axios](https://github.com/axios/axios#request-config) parameters are valid
 * @param {string} options.method The method to use
 * @param {string} options.url The URL for the request
 * @param {Object.<string, string>} options.headers The headers to append to the request
 * @param {Object.<string, string|number>} options.data The data to send with the request, if the method allows it
 * @param {Object.<string, string|number>} options.params The query parameters for the request
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
  else
    options.headers['User-Agent'] = userAgent;
  return axios(options);
}

module.exports = FormatRequest;
