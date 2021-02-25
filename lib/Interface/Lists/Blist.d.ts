import { Service, ServicePostOptions } from '../Service';
import { IDResolvable } from '../../Utils/Util';
import { Query } from '../../Utils/Constants';
/**
 * Represents the Blist service.
 * @see https://blist.xyz/docs/
 */
export default class Blist extends Service {
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
    /**
     * Gets the user listed on this service.
     * @param id The user's ID
     */
    getUser(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the user's bots listed on this service.
     * @param id The user's ID
     */
    getUserBots(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the user's servers listed on this service.
     * @param id The user's ID
     */
    getUserServers(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the server listed on this service.
     * @param id The server's ID
     */
    getServer(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    getBot(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the list of people who voted this bot on this service.
     * @param id The bot's ID
     */
    getBotVotes(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the bot's reviews on this service.
     * @param id The bot's ID
     */
    getBotReviews(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the widget URL for this bot.
     * @param id The bot's ID
     * @param query The query string that will be used in the request
     */
    getWidgetURL(id: IDResolvable, query: Query): string;
}
