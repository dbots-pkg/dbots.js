import Service, { ServicePostOptions } from '../Service';
import { IDResolvable } from '../../Utils/Util';
/**
 * Represents the DiscordListology service.
 * @see https://discordlistology.com/developer/documentation
 */
export default class DiscordListology extends Service {
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
     * Gets the bot's stats listed on this service.
     * @param id The bot's ID
     */
    getBotStats(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Checks whether or not a user has voted for a bot on this service.
     * @param id The bot's ID
     * @param userID The user's ID
     */
    userVotedBot(id: IDResolvable, userID: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the guild's stats listed on this service.
     * @param id The guild's ID
     */
    getGuildStats(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Checks whether or not a user has voted for a guild on this service.
     * @param id The guild's ID
     * @param userID The user's ID
     */
    userVotedGuild(id: IDResolvable, userID: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
}
