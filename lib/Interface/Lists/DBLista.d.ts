import ServiceBase from '../ServiceBase';
import { AnyObject, CountResolvable, IDResolvable } from '../../Utils/Util';
/**
 * Represents the DBLista service.
 * @see https://docs.dblista.pl/
 */
export default class DBLista extends ServiceBase {
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
     * <warn>This service does not support posting.
     * This function is defined to properly return an error if improperly used to post.</warn>
     * @private
     */
    static post(): Promise<never>;
    /**
     * Adds a bot to the service.
     * @param data The data being posted. This should include the ID of the bot
     */
    addBot(data: AnyObject): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Updates the bot's listing with the data provided.
     * @param data The data being posted. This should include the ID of the bot
     */
    updateBot(data: AnyObject): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    getBot(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets a list of bots on this service.
     * @param page The page you want to get
     */
    getBots(page?: CountResolvable): Promise<import("axios").AxiosResponse<any>>;
    /** Gets a list of unverified bots on this service. */
    getUnverifiedBots(): Promise<import("axios").AxiosResponse<any>>;
    /** Gets a list of rejected bots on this service. */
    getRejectedBots(): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Adds a rating to a bot on the service.
     * @param id The bot's ID
     * @param data The data being posted
     */
    rateBot(id: IDResolvable, data: AnyObject): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Removes a rating from a bot on the service.
     * @param id The bot's ID
     */
    removeRating(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Removes a bot from the service.
     * @param id The bot's ID
     */
    removeBot(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Searches for bots on the service.
     * @param query The query to search for
     */
    search(query: string): Promise<import("axios").AxiosResponse<any>>;
}
