import ServiceBase, { ServiceBasePostOptions } from '../ServiceBase';
import { IDResolvable } from '../../Utils/Util';
/**
 * Represents the DiscordListology service.
 * @see https://discordlistology.com/developer/documentation
 */
export default class DiscordListology extends ServiceBase {
    static get aliases(): string[];
    static get logoURL(): string;
    static get serviceName(): string;
    static get websiteURL(): string;
    static get baseURL(): string;
    /**
     * Posts statistics to this service.
     * @param options The options of the request
     */
    static post(options: ServiceBasePostOptions): Promise<import("axios").AxiosResponse<any>>;
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
