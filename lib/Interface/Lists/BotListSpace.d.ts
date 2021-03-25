import { Service, ServicePostOptions } from '../Service';
import { CountResolvable, IDResolvable } from '../../Utils/Util';
import { Query } from '../../Utils/Constants';
/**
 * Represents the botlist.space service.
 * @see https://docs.botlist.space/
 */
export default class BotListSpace extends Service {
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
    /** Gets the statistics of this service. */
    getStatistics(): Promise<import("axios").AxiosResponse<any>>;
    /** Gets a list of bots on this service. */
    getBots(): Promise<import("axios").AxiosResponse<any>>;
    /** Gets the bot listed on this service. */
    getBot(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the list of people who voted this bot on this service.
     * @param id The bot's ID
     */
    getBotVotes(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the uptime of a bot listed on this service.
     * @param id The bot's ID
     */
    getBotUptime(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the user listed on this service.
     * @param id The user's ID
     */
    getUser(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the user's bots listed for this service.
     * @param id The user's ID
     */
    getUserBots(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the widget URL for this bot.
     * @param id The bot's ID
     * @param style The style of the widget, cannot be zero
     * @param query The query string that will be used in the request
     */
    getWidgetURL(id: IDResolvable, style?: CountResolvable, query?: Query): string;
}
