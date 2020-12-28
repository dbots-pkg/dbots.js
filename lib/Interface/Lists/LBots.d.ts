import { Service, ServicePostOptions } from '../Service';
import { AnyObject, IDResolvable } from '../../Utils/Util';
/**
 * Represents the LBots service.
 * @see https://lbots.org/api/docs
 */
export default class LBots extends Service {
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
     * Invalidates the token being used in the request.
     * @param id The bot's ID
     */
    invalidate(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the list of people who favorited this bot on this service.
     * @param id The bot's ID
     */
    getBotFavorites(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Checks whether or not a user has favorited a bot on this service.
     * @param id The bot's ID
     * @param userID The user's ID
     */
    userFavorited(id: IDResolvable, userID: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Updates the guilds on the bot's panel.
     * @param id The bot's ID
     * @param data The data being posted
     */
    updatePanelGuilds(id: IDResolvable, data: AnyObject): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets a guilds settings from the bot's panel.
     * @param id The bot's ID
     * @param guildID The guild's ID
     */
    getPanelGuildSettings(id: IDResolvable, guildID: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets a guilds settings from the bot's panel.
     * @param id The bot's ID
     * @param guildID The guild's ID
     * @param data The data being posted
     */
    updatePanelGuildSettings(id: IDResolvable, guildID: IDResolvable, data: AnyObject): Promise<import("axios").AxiosResponse<any>>;
}
