import { Service, ServicePostOptions } from '../Service';
/**
 * Represents the Astro Bot List service.
 * @see https://botlists.com/api/docs
 */
export default class AstroBotList extends Service {
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
     * @param options The options of the request
     */
    static post(options: ServicePostOptions): Promise<import("axios").AxiosResponse<any>>;
    /** Gets the stats of this bot. */
    getOwnStats(): Promise<import("axios").AxiosResponse<any>>;
}
