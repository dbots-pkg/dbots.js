import { Service, ServicePostOptions } from '../Service';
import { IDResolvable } from '../../Utils/Util';
/**
 * Represents the DBots service.
 * @see https://docs.dbots.co/
 */
export default class DBots extends Service {
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
     * Gets the bot's audit logs.
     * @param id The bot's ID
     */
    getAudit(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Regenerates the bot API token.
     * @param id The bot's ID
     */
    regenToken(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
}
