import { Service, ServicePostOptions } from '../Service';
import { IDResolvable } from '../../Utils/Util';
import { Query } from '../../Utils/Constants';
/**
 * Represents the Discord Boats service.
 * @see https://discord.boats/api/docs
 */
export default class DiscordBoats extends Service {
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
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    getBot(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the user listed on this service.
     * @param id The user's ID
     */
    getUser(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Checks whether or not a user has voted for a bot on this service.
     * @param id The bot's ID
     * @param userID The user's ID
     */
    userVoted(id: IDResolvable, userID: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the widget URL for this bot.
     * @param id The bot's ID
     * @param query The query string that will be used in the request
     */
    getWidgetURL(id: IDResolvable, query?: Query): string;
}
