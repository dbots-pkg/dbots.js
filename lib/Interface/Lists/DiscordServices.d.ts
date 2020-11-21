import ServiceBase, { ServiceBasePostOptions } from '../ServiceBase';
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
export default class DiscordServices extends ServiceBase {
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
