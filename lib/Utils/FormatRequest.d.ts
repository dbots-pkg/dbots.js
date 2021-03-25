import { AxiosRequestConfig, AxiosResponse } from 'axios';
/**
 * The response from the axios call
 * @see {@link https://github.com/axios/axios#response-schema}
 */
export { AxiosResponse } from 'axios';
/**
 * @private
 */
export interface RequestForm {
    /** The method to use */
    method?: AxiosRequestConfig['method'];
    /** The URL for the request */
    url: string;
    /** The headers to append to the request */
    headers?: Record<string, string>;
    /** The data to send with the request, if the method allows it */
    data?: Record<string, any>;
    /** The query parameters for the request */
    params?: Record<string, string | number | boolean>;
}
/**
 * Returns a request.
 * @param opts An object containing the config for the request: only basic properties are documented, but all [Axios](https://github.com/axios/axios#request-config) parameters are valid
 * @returns The request
 */
export declare function formatRequest(options: RequestForm): Promise<AxiosResponse>;
