import { Service, ServicePostOptions } from '../Service';
import { AnyObject, IDResolvable } from '../../Utils/Util';
/**
 * Represents the Discord Apps service.
 * @see https://discordapps.dev/en-GB/posts/docs/api-v2/
 */
export default class DiscordAppsDev extends Service {
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
    /** Gets a list of bots on this service. */
    getBots(): Promise<import("axios").AxiosResponse<any>>;
    /** Gets a list of applications on this service. */
    getApps(): Promise<import("axios").AxiosResponse<any>>;
    /** Gets a list of RPC applications on this service. */
    getRPCApps(): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    getBot(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Updates the bot with the data provided.
     * @param id The bot's ID
     * @param data The data being posted
     */
    updateBot(id: IDResolvable, data: AnyObject): Promise<import("axios").AxiosResponse<any>>;
}
