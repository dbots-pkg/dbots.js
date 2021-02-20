import { Service, ServicePostOptions } from '../Service';
import { IDResolvable } from '../../Utils/Util';
/**
 * Represents the Botrix List service.
 * @see https://docs.botrix.cc/
 */
export default class Botrix extends Service {
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
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    getBot(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Checks whether or not a user has voted for a bot on this service.
     * @param id The bot's ID
     * @param userID The user's ID
     */
    userVoted(id: IDResolvable, userID: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
}
