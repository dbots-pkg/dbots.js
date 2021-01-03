import { RequestForm } from '../Utils/FormatRequest';
import { CustomService, Query, Shard } from '../Utils/Constants';
import { CountResolvable, IDResolvable } from '../Utils/Util';
/** Options provided when sending a service request */
export interface ServiceBaseRequestOptions {
    /** Whether the request requires a token */
    requiresToken?: boolean;
    /** Whether to prepend the service's base API url */
    appendBaseURL?: boolean;
}
/** Options provided when posting to a service */
export interface ServiceBasePostOptions {
    /** The Authorization token for the request */
    token: string;
    /** The client ID that the request will post for */
    clientID: IDResolvable;
    /** The amount of servers that the client is in */
    serverCount: CountResolvable;
    /** The amount of users that the client cached */
    userCount: CountResolvable;
    /** The number of voice connections */
    voiceConnections?: CountResolvable;
    /** The shard the request is representing */
    shard?: Shard;
}
/** Represents a basic service. */
export default class ServiceBase {
    /**
     * The token that will be used for the service.
     * @private
     */
    token: string;
    /**
     * @param token The token/key for the service
     */
    constructor(token: string);
    /** The base URL of the service's API. */
    static get baseURL(): string;
    /**
     * Gets a service from a key.
     * @param key The name of the service to get
     * @param extras An array of {@link CustomService}s to include
     */
    static get(key: string, extras?: CustomService[]): typeof ServiceBase | null;
    /** Gets every loaded service. */
    static getAll(): Record<string, typeof ServiceBase>;
    /**
     * Posts statistics to this service.
     * Internally, this is supposed to be used in extended classes.
     * @param form The request form
     * @param appendBaseURL Whether to append the service's base API url
     * @private
     */
    static _post(form: RequestForm, appendBaseURL?: boolean): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Sends a request for the service interface.
     * @param form The request form
     * @param options The options of this request
     * @private
     */
    _request(form: RequestForm, options?: ServiceBaseRequestOptions): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Appends query string to a URL.
     * @param url The URL to modify
     * @param query The query to append
     * @param appendBaseURL Whether to prepend the service's base API url
     * @returns The modified URL
     * @private
     */
    _appendQuery(url: string, query: Query, appendBaseURL?: boolean): string;
    /** The values that can be used to select the service. */
    static get aliases(): string[];
    /**
     * The logo URL, used only for documentation.
     * @private
     */
    static get logoURL(): string;
    /**
     * Service's name, used only for documentation.
     * @private
     */
    static get serviceName(): string;
    /**
     * The website URL, used only for documentation.
     * @private
     */
    static get websiteURL(): string;
    static post(options: ServiceBasePostOptions): ReturnType<typeof ServiceBase['_post']>;
}
