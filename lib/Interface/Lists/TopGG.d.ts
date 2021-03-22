import { Service, ServicePostOptions } from '../Service';
import { IDResolvable } from '../../Utils/Util';
import { Query } from '../../Utils/Constants';
/**
 * Represents the Top.gg service.
 * @see https://docs.top.gg/
 */
export default class TopGG extends Service {
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
     * Gets the a of bots on this service that match your query (refer to Top.gg docs for query parameters).
     * @param query The query string that will be used in the request
     */
    getBots(query: Query): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    getBot(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the bot's stats listed on this service.
     * @param id The bot's ID
     */
    getBotStats(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the list of people who voted this bot on this service.
     * @param id The bot's ID
     */
    getBotVotes(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Checks whether or not a user has voted for a bot on this service.
     * @param botId The bot's ID
     * @param userID The user's ID
     */
    userVoted(botId: IDResolvable, userID: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the widget URL for this bot.
     * @param id The bot's ID
     * @param query The query string that will be used in the request
     * @param smallWidget The sub-path name to turn the widget into a badge (i.e. owner)
     */
    getWidgetURL(id: IDResolvable, query?: Query, smallWidget?: string): string;
}
