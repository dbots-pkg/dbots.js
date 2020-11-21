import ServiceBase, { ServiceBasePostOptions } from '../ServiceBase';
import { IDResolvable } from '../../Utils/Util';
import { Query } from '../../Utils/Constants';
/**
 * Represents the YABL service.
 * @see https://yabl.xyz/api
 */
export default class YABL extends ServiceBase {
    static get aliases(): string[];
    static get logoURL(): string;
    static get serviceName(): string;
    static get websiteURL(): string;
    static get baseURL(): string;
    /**
     * Posts statistics to this service.
     * <warn>Shard data posting is not supported for this service.</warn>
     * @param options The options of the request
     */
    static post(options: ServiceBasePostOptions): Promise<import("axios").AxiosResponse<any>>;
    /** Invalidates the token being used in the request. */
    invalidate(): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    getBot(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /** Gets 20 random bots from this service. */
    getRandomBots(): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the user's bots listed for this service.
     * @param id The user's ID
     */
    getUserBots(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /** Gets a list of bots on this service. */
    getBots(): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets a page of bots on this service.
     * @param query The query string that will be used in the request
     */
    getBotsByPage(query: Query): Promise<import("axios").AxiosResponse<any>>;
    /** Gets a list of unverified bots on this service. */
    getUnverifiedBots(): Promise<import("axios").AxiosResponse<any>>;
}
