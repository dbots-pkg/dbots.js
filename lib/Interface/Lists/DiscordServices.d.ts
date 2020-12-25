import Service, { ServicePostOptions } from '../Service';
import { IDResolvable } from '../../Utils/Util';
/** The options to use when posting command info for the DiscordServices service */
export interface DiscordServicesCommandInfo {
    /** The command name including the prefix */
    command: string;
    /** The description for your command */
    desc: string;
    /** The category of your command */
    category: string;
}
/**
 * Represents the Discord Services service.
 * @see https://discordservices.net/docs/api
 */
export default class DiscordServices extends Service {
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
     * Posts news to your bot page
     * @param id The bot's ID
     * @param title The title of the post
     * @param content The content of the post
     */
    postNews(id: IDResolvable, title: string, content: string): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Posts commands info to your bot page
     * @param id The bot's ID
     * @param commands The command info to post
     */
    postCommands(id: IDResolvable, commands: DiscordServicesCommandInfo[]): Promise<import("axios").AxiosResponse<any>>;
}
