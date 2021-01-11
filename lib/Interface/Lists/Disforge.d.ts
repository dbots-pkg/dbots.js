import { Service, ServicePostOptions } from '../Service';
/**
 * Represents the Disforge service.
 * @see https://disforge.com/developer
 */
export default class Disforge extends Service {
    /** The values that can be used to select the service. */
    static get aliases(): string[];
    /** The logo URL. */
    static get logoURL(): string;
    /** Service's name. */
    static get serviceName(): string;
    /** The website URL. */
    static get websiteURL(): string;
    /** The base URL of the service's API. */
    static get baseURL(): string;
    /**
     * Posts statistics to this service.
     * <warn>Shard data posting is not supported for this service.</warn>
     * @param options The options of the request
     */
    static post(options: ServicePostOptions): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Retreives the data shown on the homepage.
     */
    getHomepage(): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Retreives statistics about Disforge.
     */
    getStats(): Promise<import("axios").AxiosResponse<any>>;
}
