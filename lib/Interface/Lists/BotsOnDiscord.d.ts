import ServiceBase, { ServiceBasePostOptions } from '../ServiceBase';
import { IDResolvable } from '../../Utils/Util';
import { Query } from '../../Utils/Constants';
/**
 * Represents the Bots On Discord service.
 * @see https://bots.ondiscord.xyz/info/api
 */
export default class BotsOnDiscord extends ServiceBase {
    static get aliases(): string[];
    static get logoURL(): string;
    static get serviceName(): string;
    static get websiteURL(): string;
    static get baseURL(): string;
    /**
     * Posts statistics to this service.
     * <warn>Shard data posting is not supported for this service.</warn>
     * @param options The options of the request
     */
    static post(options: ServiceBasePostOptions): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Checks whether or not a user has reviewed a bot.
     * @param id The bot's ID
     * @param userId The user's ID
     */
    checkReview(id: IDResolvable, userId: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the widget URL for this bot.
     * @param id The bot's ID
     * @param query The query string that will be used in the request
     */
    getWidgetURL(id: IDResolvable, query?: Query): string;
}
