import ServiceBase, { ServiceBasePostOptions } from '../ServiceBase';
/**
 * Represents the Discord Bot List service.
 * @see https://discordbotlist.com/api-docs
 */
export default class DiscordBotList extends ServiceBase {
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
}
