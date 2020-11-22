import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Package } from './Constants'

/*
{
  method: '',
  url: '',
  headers: { ... },
  data: { ... }
}
*/

/**
 * The response from the axios call
 * @see {@link https://github.com/axios/axios#response-schema}
 */
export { AxiosResponse } from 'axios'

/**
 * @private
 */
export interface RequestForm {
  /** The method to use */
  method?: AxiosRequestConfig['method']

  /** The URL for the request */
  url: string

  /** The headers to append to the request */
  headers?: Record<string, string>

  /** The data to send with the request, if the method allows it */
  data?: Record<string, any>

  /** The query parameters for the request */
  params?: Record<string, string | number | boolean>
}

/**
 * Returns a request.
 * @param opts An object containing the config for the request: only basic properties are documented, but all [Axios](https://github.com/axios/axios#request-config) parameters are valid
 * @returns The request
 */
export default function FormatRequest(
  options: RequestForm
): Promise<AxiosResponse> {
  const opts: AxiosRequestConfig = options

  if (!opts.method) opts.method = 'get'

  // This is no longer needed, because the types enforce the correct properties
  // if (opts.body) {
  //   opts.data = opts.body
  //   delete opts.body
  // }
  // if (opts.query) {
  //   opts.params = opts.query
  //   delete opts.query
  // }

  const userAgent = `dbots (https://github.com/dbots-pkg/dbots.js ${Package.version}) Node.js/${process.version}`
  if (!opts.headers)
    opts.headers = {
      'User-Agent': userAgent,
    }
  else if (!opts.headers['User-Agent']) opts.headers['User-Agent'] = userAgent

  return axios(opts)
}
