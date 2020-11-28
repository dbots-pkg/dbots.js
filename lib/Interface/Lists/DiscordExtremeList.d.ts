import ServiceBase, { ServiceBasePostOptions } from '../ServiceBase';
import { IDResolvable } from '../../Utils/Util';
/**
 * Represents the Discord Extreme List service.
 * @see https://docs.discordextremelist.xyz/
 */
export default class DiscordExtremeList extends ServiceBase {
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
    static post(options: ServiceBasePostOptions): Promise<import("axios").AxiosResponse<any>>;
    /** Gets the statistics of this service. */
    getStatistics(): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    getBot(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the user listed on this service.
     * @param id The bot's ID
     */
    getUser(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
}
