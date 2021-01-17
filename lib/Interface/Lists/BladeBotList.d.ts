import { Service, ServicePostOptions } from '../Service';
import { IDResolvable } from '../../Utils/Util';
/**
 * Represents the BladeBotList service.
 * @see https://docs.bladebotlist.xyz/api/introduction.html
 */
export default class BladeBotList extends Service {
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
     * @param {Object} options The options of the request
     */
    static post(options: ServicePostOptions): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    getBot(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Checks whether a user has given a vote to the bot
     * @param botId The bot's ID
     * @param userID The user's ID
     */
    userVoted(botId: IDResolvable, userID: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
}
