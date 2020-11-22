import { PromiseResolvable } from './EnsurePromise';
/** Options for a poster. */
export interface PosterOptions {
    /** An object that pairs a {@link Service} with their token */
    apiKeys?: Record<Service, string>;
    /**
     * The client that a supported {@link Library} uses to manage the Discord application.
     * Requires {@link #clientLibrary} to be present
     */
    client?: object;
    /**
     * The client ID used for posting to a {@link Service}.
     * Automatically filled in when {@link #client} is present
     */
    clientID?: string;
    /** The library that the client is based on */
    clientLibrary?: Library;
    /**
     * The function to use when posting to a server that uses the client ID, the amount of servers, and a {@link Shard}.
     * This will be used when the {@link Service} is `custom`
     */
    post?: PromiseResolvable<void>;
    /** The shard data for using different methods of posting to services */
    shard?: Shard;
    /** The function to use when retrieving the amount of servers a client/shard is in, using the client as a parameter */
    serverCount?: PromiseResolvable<number>;
    /** The function to use when retrieving the amount of users a client/shard is connected with, using the client as a parameter */
    userCount?: PromiseResolvable<number>;
    /** The function to use when retrieving the number of active voice connections, using the client as a parameter */
    voiceConnections?: PromiseResolvable<number>;
    /** The custom services that the poster will use */
    customServices?: CustomService[];
    /** Whether or not to use a {@link ServiceBase}s sharding methods when posting */
    useSharding?: boolean;
}
/** A shard that is used when posting to services. */
export interface Shard {
    count?: number;
    id?: number;
}
/** The object that is given to {@link ServiceBase}s and {@link CustomService}s in order to send requests to them. */
export interface PostRequestData {
    /** The Authorization token for the request */
    token: string;
    /** The client ID that the request will post for */
    clientID?: string;
    /** The amount of servers that the client is in */
    serverCount?: number;
    /** The amount of users that the client cached */
    userCount?: number;
    /** The amount of voice connections the client has */
    voiceConnections?: number;
    /** The shard the request is representing */
    shard?: Shard;
}
/** An object with all query parameters */
export declare type Query = Record<string, string | number>;
/**
 * A mock of a {@link Service} that only consists of the nessessities for a poster to use it.
 * <warn>When you're passing your custom services to method in this package, remmeber to use pass the actual service class, not an instance of it.</warn>
 * @example
 * class MyCustomService {
 *   static get aliases() {
 *     return ['a', 'string', 'array'] // string[]
 *   }
 *
 *   static post() {
 *     return yourCustomPostMethod() // Promise<any>
 *   }
 * }
 */
export declare type CustomService = any;
/**
 * A {@link ServiceBase} key supported by the package.
 * This can also includes keys from {@link CustomService}s and can be `custom` if a {@link Poster} has a custom post function.
 * @see {@link https://dbots.js.org/#/docs/main/master/general/services}
 */
export declare type Service = string;
/**
 * A library supported by the package. Here are the available libraries:
 * * discord.js
 * * discord.io
 * * discordie
 * * eris
 */
export declare type Library = 'discord.js' | 'discord.io' | 'discordie' | 'eris';
/**
 * Type of function to set for handlers
 * @param result The result(s) of the post
 */
export declare type eventHandler = (result: object | object[]) => void;
/**
 * An event that can be added an handler for. These are the available events:
 * * autopost
 * * autopostfail
 * * post
 * * postfail
 */
export declare type CustomEvent = 'autopost' | 'autopostfail' | 'post' | 'postfail';
export declare const SupportedEvents: CustomEvent[];
export declare const Package: any;
