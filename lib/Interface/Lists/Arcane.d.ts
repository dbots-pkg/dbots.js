import ServiceBase, { ServiceBasePostOptions } from '../ServiceBase';
/**
 * Represents the Arcane Bot Center service.
 * @see https://arcane-center.xyz/documentation
 */
export default class Arcane extends ServiceBase {
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
