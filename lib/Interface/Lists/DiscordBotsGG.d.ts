import ServiceBase, { ServiceBasePostOptions } from '../ServiceBase';
import { IDResolvable } from '../../Utils/Util';
import { Query } from '../../Utils/Constants';
/** The user agent used options for the DiscordBotsGG service */
export interface DiscordBotsGGUserAgent {
    /** The bot's library */
    library: string;
    /** The bot ID for the user agent */
    clientID: string;
}
/**
 * Represents the Discord Bots service.
 * @see https://discord.bots.gg/docs
 */
export default class DiscordBotsGG extends ServiceBase {
    /** The user agent options for this service */
    private agent;
    /**
     * @param token The token/key for the service
     * @param userAgent The user agent options of the service. Providing this is highly recommended.
     */
    constructor(token: string, userAgent?: DiscordBotsGGUserAgent);
    static get aliases(): string[];
    static get logoURL(): string;
    static get serviceName(): string;
    static get websiteURL(): string;
    static get baseURL(): string;
    /**
     * Creates a compliant user agent to use for any API calls to Discord Bots.
     * @param botID The ID of the bot that the agent will be identified with
     * @param library The library the agent is using
     */
    static userAgent(botID: IDResolvable, library?: string): string;
    /**
     * Posts statistics to this service.
     * @param options The options of the request
     */
    static post(options: ServiceBasePostOptions): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     * @param sanitized Whether to sanitize descriptions
     */
    getBot(id: IDResolvable, sanitized?: boolean): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets a list of bots on this service.
     * @param query The query string that will be used in the request
     */
    getBots(query?: Query): Promise<import("axios").AxiosResponse<any>>;
}
