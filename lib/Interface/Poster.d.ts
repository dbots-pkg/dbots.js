/// <reference types="node" />
import { CustomEvent, CustomService, eventHandler, PosterOptions, Service } from '../Utils/Constants';
import ServiceBase from './ServiceBase';
export interface manualPostOptions {
    /** The server count to post to the service */
    serverCount: number;
    /** The user count to post to the service */
    userCount?: number;
    /** The voice connection count to post to the service */
    voiceConnections?: number;
}
/** A class that posts server count to listing site(s). */
export default class Poster {
    /** The client that will be used to fetch the stats */
    client: PosterOptions['client'];
    /** An array of custom services that the poster uses */
    customServices: CustomService[];
    /** The API keys that the poster is using */
    apiKeys: Record<Service, string>;
    /** The options the poster was built with */
    readonly options: PosterOptions;
    /** The list of event handlers for every custom event */
    handlers: Record<CustomEvent, eventHandler[]>;
    /** The client filler used in the poster */
    private _clientFiller;
    /** Interval that posts to all services */
    private _interval?;
    /**
     * @constructor
     * @param options The options needed to construct the poster
     */
    constructor(options: PosterOptions);
    /** The client filler used in the poster */
    private get clientFiller();
    /**
     * Retrieves the current server count of the client/shard.
     * @returns Amount of servers the client/shard is in
     */
    getServerCount(): Promise<number>;
    /**
     * Retrieves the current user count of the client/shard.
     * @returns Amount of users the client/shard is connected with
     */
    getUserCount(): Promise<number>;
    /**
     * Retrieves the current voice connection count of the client/shard.
     * @returns Number of active voice connections
     */
    getVoiceConnections(): Promise<number>;
    /**
     * Creates an interval that posts to all services.
     * @param interval The time (in ms) to reach to post to all {@link Service}s again
     * @returns The interval that is responsible for posting
     * @emits Poster#autopostSuccess
     * @emits Poste#autopostFail
     */
    startInterval(interval?: number): NodeJS.Timeout;
    /** Destroys the current interval. */
    stopInterval(): void;
    /**
     * Gets a service, autofilling its API key if the poster has it.
     * @param service The service to get
     */
    getService(service: Service): ServiceBase | CustomService | undefined;
    /**
     * Posts the current clients server count to a service.
     * @param service The service to post to
     * @see Poster#postManual
     * @returns The result(s) of the post
     * @emits Poster#postSuccess
     * @emits Poster#postFail
     */
    post(service?: Service | 'all'): Promise<object | object[]>;
    /**
     * Manually posts a server count to a service.
     * @param service The service to post to
     * @param counts An object containing the tallies of servers, users and voice connections
     * @returns The result(s) of the post
     */
    postManual(service: Service | 'all', counts: manualPostOptions): Promise<object | object[]>;
    /**
     * Adds an handler for an event.
     * @param event The name of the event to add the handler to
     * @param handler The function that is run with the event
     * @returns The array of handlers currently set for that event
     */
    addHandler(event: CustomEvent, handler: eventHandler): eventHandler[];
    /**
     * Removes an handler for an event.
     * @param event The name of the event to remove the handler from
     * @param handler The function that is run with the event
     * @returns The array of handlers currently set for that event
     */
    removeHandler(event: CustomEvent, handler: eventHandler): eventHandler[];
    /**
     * Manually triggers an event with custom arguments.
     * @param {CustomEvent} event The name of the event to run the handlers for
     * @param  {...any} args The arguments to pass to the handlers
     */
    runHandlers(event: CustomEvent, ...args: any[]): void;
}
