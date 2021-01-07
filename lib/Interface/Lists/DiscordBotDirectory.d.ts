import { Service, ServicePostOptions } from '../Service';
import { IDResolvable } from '../../Utils/Util';
/**
 * Represents the Discord Bot Directory service.
 * @see https://botblock.org/lists/discordbotdirectory.net
 */
export default class DiscordBotDirectory extends Service {
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
     * <warn>The docs for this endopoint exist only in a Discord message</warn>
     * @param options The options of the request
     */
    static post(options: ServicePostOptions): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the widget URL for this bot.
     * @param id The bot's ID
     */
    getWidgetURL(id: IDResolvable): string;
}
