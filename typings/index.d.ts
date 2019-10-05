import { Shard, SupportedEvents } from '../src/Utils/Constants';
import { AxiosRequestConfig } from 'axios'

type Library = 'discord.js' | 'discord.io' | 'discordie'
type Service = 'discordbotsgg' | 'discordbotsorg' | 'topgg' | 'botsfordiscord' | 'botsondiscord' | 'discordappsdev' | 'listcord' | 'carbon' | 'discordbotlist' | 'divinediscordbots' | 'discordboats'
type CustomEvent = 'autopost'

class ServiceBase {
  constructor(token: string)
  _request(form, requiresToken?: boolean): Promise<any>
}

interface RequestFormat extends AxiosRequestConfig {
  method: string
  url: string
  headers?: object
  data?: object
  params?: object
}

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T
}
type keyFormat = PartialRecord<Service, string>

interface handlerCollector {
  autopost: ((result: object | object[]) => void)[]
}

declare module 'dbots' {
  /** Data that can be resolved to give a string. This can either be a Function or a Promise */
  type PromiseResolvable = Function | Promise<string>

  /** Options for a poster. */
  interface PosterOptions {
    /** An object that pairs a `Service` with their token. */
    apiKeys: keyFormat
    /** The client that a supported `Library` uses to manage the Discord application. Requires `clientLibrary` to be present. */
    client?: object
    /** The client ID used for posting to a `Service`. Automatically filled in when `client` is present. */
    clientID?: string
    /** The library that the client is based on. */
    clientLibrary?: Library
    /** The function to use when posting to a server that uses the client ID, the amount of servers, and a `Shard`. This will be used when the `Service` is `custom`. */
    post?: PromiseResolvable
    /** The shard data for using different methods of posting to services. */
    shard?: Shard
    /** The function to use when retrieving the amount of servers a client/shard is in. Uses the client as a parameter. */
    serverCount?: PromiseResolvable
    /** The function to use when retrieving the amount of users a client/shard is connected with. Uses the client as a parameter. */
    userCount?: PromiseResolvable
    /** The function to use when retrieving the number of active voice connections. Uses the client as a parameter. */
    voiceConnections?: PromiseResolvable
    /** Whether or not to use a `Service` sharding method when posting. */
    useSharding?= true
  }

  /** A class that posts server count to listing site(s). */
  export class Poster {
    client?: object
    clientID: string
    handlers: handlerCollector
    options: PosterOptions
    _interval?: NodeJS.Timeout

    /**
     * A class that posts server count to listing site(s).
     * @param options The options needed to construct the poster.
     */
    constructor(options: PosterOptions)

    /**
     * Retrieves the current server count of the client/shard
     * @returns Amount of servers the client/shard is in
     */
    getServerCount(): Promise<number>

    /**
     * Retrieves the current user count of the client/shard
     * @returns Amount of users the client/shard is connected with
     */
    getUserCount(): Promise<number>

    /**
     * Retrieves the current voice connection count of the client/shard
     * @returns Number of active voice connections
     */
    getVoiceConnections(): Promise<number>

    /**
     * Creates an interval that posts to all services
     * @param interval The time (in ms) to reach to post to all {link  Service}s again.
     * @returns The interval that is responsible for posting
     */
    startInterval(interval = 1800000): NodeJS.Timeout

    /** Destroys the current interval */
    stopInterval(): void

    /** 
     * Posts the current clients server count to a service
     * @param service The service to post to
     * @returns The result(s) of the post
     */
    post(service?: Service): Promise<object | object[]>

    /**
     * Manually posts a server count to a service
     * @param serverCount The server count to post to the service
     * @param service The service to post to
     * @param userCount The server count to post to the service
     * @param voiceConnections The voice connection count to post to the service
     * @returns The result(s) of the post
     */

    postManual(serverCount: number, service?: Service): Promise<object | object[]>

    /**
     * Adds an handler for an event
     * @param event The name of the event to add the handler to
     * @param handler The function that is run with the event
     * @returns The array of handlers currently set for that event
     */
    addHandler(event: 'autopost', handler: (result: object | object[]) => void): PromiseResolvable[]
    addHandler(event: CustomEvent, handler: PromiseResolvable): PromiseResolvable[]

    /**
     * Removes an handler for an event
     * @param event The name of the event to remove the handler from
     * @param handler The function that is run with the event
     * @returns The array of handlers currently set for that event
     */
    removeHandler(event: 'autopost', handler: (result: object | object[]) => void): PromiseResolvable[]
    removeHandler(event: CustomEvent, handler: PromiseResolvable): PromiseResolvable[]

    /**
    * Manually triggers an event with custom arguments
    * @param event The name of the event to run the handlers for
    * @param args The arguments to pass to the handlers
    */
    runHandlers(event: 'autopost', result: object | object[]): void
    runHandlers(event: CustomEvent, ...args: any[]): void

  }

  //#region services
  /**
   * Represents the bots.discord.pw service
   * @see https://discord.bots.gg/docs
   */
  export class DiscordBotsGG extends ServiceBase {
    /**
     * Gets the bot listed for this service
     * @param id The bot's ID.
     */
    getBot(id: string, sanitized = false): Promise<any>

    /** Gets a list of bots on this service */
    getBots(query): Promise<any>
  }

  /**
   * Represents the Bots For Discord service
   * @see https://docs.botsfordiscord.com/
   */
  export class BotsForDiscord extends ServiceBase {
    /**
     * Gets the bot listed for this service
     * @param id The bot's ID.
     */
    getBot(id: string): Promise<any>

    /**
     * Gets the widget for this bot
     * @param id The bot's ID.
     * @param query The querystring that will be used in the request
     */
    getBotWidget(id: string, query: object): Promise<any>

    /**
     * Gets the votes for this bot
     * @param id The bot's ID.
     */
    getBotVotes(id: string): Promise<any>

    /**
     * Gets the user listed for this service
     * @param id The user's ID.
     */
    getUser(id: string): Promise<any>

    /**
     * Gets the user's list of managed bots
     * @param id The user's ID.
     */
    getUserBots(id: string): Promise<any>
  }

  /**
   * Represents the top.gg (formerly discordbots.org) service
   * @see https://top.gg/api/docs
   */
  export class TopGG extends ServiceBase {
    /**
     * Gets the user listed for this service
     * @param id The user's ID.
     */
    getUser(id: string): Promise<any>

    /** Gets the list of bots listed for this service */
    getBots(): Promise<any>

    /**
     * Gets the bot listed for this service
     * @param id The bot's ID.
     */
    getBot(id: string): Promise<any>

    /**
     * Gets the bot's stats listed on this service
     * @param id The bot's ID.
     */
    getBotStats(id: string): Promise<any>

    /**
     * Gets the data on the voters for this bot
     * @param id The bot's ID.
     * @param query The querystring that will be used in the request
     */
    getBotVotes(id: string, query: object): Promise<any>

    /**
     * Gets the embed picture for this bot
     * @param id The bot's ID.
     * @param query The querystring that will be used in the request
     */
    getBotEmbed(id: string, query: object): Promise<any>
  }

  /**
   * Represents the discordbots.org service
   * @see https://discordbots.org/api/docs
   * @deprecated
   */
  export class DiscordBotsOrg extends TopGG { }

  /**
   * Represents the discordapps.dev's service
   * @see https://discordapps.dev/en-GB/posts/docs/api-v2/
   */
  export class DiscordAppsDev extends ServiceBase {
    /**
     * Tests the initialized token
     * @param id The ID of a bot that the token is in control of.
     */
    test(id: string): Promise<any>

    /** Gets a list of bots on this service */
    getBots(): Promise<any>

    /**
     * Gets the bot listed for this service
     * @param id The bot's ID.
     */
    getBot(id: string): Promise<any>

    /**
     * Gets the embed picture for this bot
     * @param id The bot's ID.
     * @param query The querystring that will be used in the request
     */
    getBotEmbed(id: string, query: object): Promise<any>
  }

  /**
   * Represents the Bots On Discord service
   * @see https://bots.ondiscord.xyz/info/api
   */
  class BotsOnDiscord extends ServiceBase { }

  /**
   * Represents the listcord.com service
   * @see https://listcord.com/developers/docs
   */
  class Listcord extends ServiceBase {
    /**
     * Gets the list of bots listed for this service
     * @param limit The amount of IDs to list.
     * @param offset The offset of the list.
     */
    getBots(limit?: number, offset?: number): Promise<any>

    /**
     * Searches a term amongst the bots in this service
     * @param q Query to seearch for.
     * @param limit The amount of IDs to list.
     * @param offset The offset of the list.
     */
    searchBots(q: string, limit?: number, offset?: number): Promise<any>

    /**
     * Gets the bot listed for this service
     * @param id The bot's ID.
     */
    getBot(id: string): Promise<any>

    /**
     * Gets the data on the voters for this bot
     * @param id The bot's ID.
     */
    getBotVotes(id: string): Promise<any>
  }

  /**
   * Represents the Discord Bot List service
   * @see https://discordbotlist.com/api-docs
   */
  class DiscordBotList extends ServiceBase {
    /**
     * Gets the widget for this bot
     * @param id The bot's ID.
     */
    getBotWidget(id: string): Promise<any>
  }

  /**
  * Represents the divinediscordbots.com's service
  * @see https://divinediscordbots.com/api
  */
  class DivineDiscordBots extends ServiceBase {
    /**
     * Gets the bot stats for your bot
     * @param id The bot's ID.
     */
    getBotStats(id: string): Promise<any>

    /**
     * Gets the bot votes for your bot
     * @param id The bot's ID.
     */
    getBotVotes(id: string): Promise<any>
  }

  /**
   * Represents the discord.boats's service
   * @see https://discord.boats/api/docs
   */
  class DiscordBoats extends ServiceBase {
    /**
     * Gets the bot listed for this service
     * @param id The bot's ID.
     */
    getBot(id: string): Promise<any>

    /**
     * Gets the user listed for this service
     * @param id The user's ID.
     */
    getUser(id: string): Promise<any>

    /**
     * Whether or not a user has voted for a bot
     * @param id The bot's ID.
     * @param userID The user's ID.
     */
    userVoted(id: string, userID: string): Promise<any>
  }
  //#endregion


  export interface Constants {
    PostFormat: {
      discordbotsgg: (token: string, clientID: string, serverCount: number, shard?: Shard) => RequestFormat
      discordbotsorg: (token: string, clientID: string, serverCount: number, shard?: Shard) => RequestFormat // deprecated
      topgg: (token: string, clientID: string, serverCount: number, shard?: Shard) => RequestFormat
      discordappsdev: (token: string, clientID: string, serverCount: number) => RequestFormat
      botsfordiscord: (token: string, clientID: string, serverCount: number) => RequestFormat
      botsondiscord: (token: string, clientID: string, serverCount: number) => RequestFormat
      listcord: (token: string, clientID: string, serverCount: number) => RequestFormat
      carbon: (token: string, _: any, serverCount: number) => RequestFormat
      discordbotlist: (token: string, clientID: string, serverCount: number, shard?: Shard, usersCount?: number, voiceConnections?: number) => RequestFormat
      divinediscordbots: (token: string, clientID: string, serverCount: number) => RequestFormat
      discordboats: (token: string, clientID: string, serverCount: number) => RequestFormat
    }

    AvailableServices: string[]
    SupportingLibraries: string[]
    SupportedEvents: string[]

    ServerCountFunctions: {
      [library: Library]: (client: any) => number
    }
    UserCountFunctions: {
      [library: Library]: (client: any) => number
    }
    VoiceConnectionsFunctions: {
      [library: Library]: (client: any) => number
    }
    AutoValueFunctions: {
      [library: Library]: (client: any) => {
        clientID: string,
        shard?: object
      }
    }
  }

  export function EnsurePromise(func: Function, ...args: any[]): Promise<any>

  export function FormatRequest(options: RequestFormat): Promise<any>
}
