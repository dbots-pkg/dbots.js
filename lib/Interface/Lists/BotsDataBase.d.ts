import ServiceBase, { ServiceBasePostOptions } from '../ServiceBase';
import { IDResolvable } from '../../Utils/Util';
/**
 * Represents the BotsDataBase service.
 * @see https://docs.botsdatabase.com/
 */
export default class BotsDataBase extends ServiceBase {
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
     * Gets the user listed on this service.
     * @param id The user's ID
     */
    getUser(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    getBot(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Gets the list of people who voted this bot on this service.
     * @param id The bot's ID
     */
    getBotVotes(id: IDResolvable): Promise<import("axios").AxiosResponse<any>>;
}
