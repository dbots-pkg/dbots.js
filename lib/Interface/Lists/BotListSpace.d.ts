import { ServiceBasePostOptions } from '../ServiceBase';
import ServiceBase from '../ServiceBase';
import { CountResolvable, IDResolvable } from '../../Utils/Util';
import { Query } from '../../Utils/Constants';
/**
 * Represents the botlist.space service.
 * @see https://docs.botlist.space/
 */
export default class BotListSpace extends ServiceBase {
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
