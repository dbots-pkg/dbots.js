import Service, { ServicePostOptions } from '../Service';
import { IDResolvable } from '../../Utils/Util';
import { Query } from '../../Utils/Constants';
/**
 * Represents the List My Bots service.
 * @see https://listmybots.com/docs/api
 */
export default class ListMyBots extends Service {
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
     * Gets the status widget URL for this bot.
     * @param id The bot's ID
     * @param query The query string that will be used in the request
     */
    getStatusWidgetURL(id: IDResolvable, query?: Query): string;
    /**
     * Gets the user listed on this service.
     * @param id The user's ID
     */
    getUser(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the info about someone's bots.
     * @param id The user's ID
     */
    getUserBots(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the widget URL for this bot.
     * @param id The bot's ID
     * @param query The query string that will be used in the request
     */
    getWidgetURL(id: IDResolvable, query?: Query): string;
}
