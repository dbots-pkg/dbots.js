import { Shard } from "../src/Utils/Constants";

type Library = 'discord.js' | 'discord.io' | 'discordie'
type Service = 'discordbotsgg' | 'discordbotsorg' | 'botsfordiscord' | 'botsondiscord' | 'lsterminalink' | 'listcord' | 'carbon'

class ServiceBase {
  constructor(token: string)
  _request(form, requiresToken?: boolean): Promise<any>
}

interface RequestFormat {
  method: string
  url: string
  headers?: object
  body: object
}

interface keyFormat {
  discordbotsgg?: string
  discordbotsorg?: string
  botsfordiscord?: string
  botsondiscord?: string
  lsterminalink?: string
  listcord?: string
  carbon?: string
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
    clientLibrary?: Library
    /** The function to use when posting to a server that uses the client ID, the amount of servers, and a `Shard`. This will be used when the `Service` is `custom`. */
    post?: PromiseResolvable
    /** The shard data for using different methods of posting to services. */
    shard?: Shard
    /** The function to use when retrieving the amount of servers a client/shard is in. Uses the client as a parameter. */
    serverCount?: PromiseResolvable
    /** Whether or not to use a `Service` sharding method when posting. */
    useSharding?= true
  }

  /** A class that posts server count to listing site(s). */
  export class Poster {
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
     * @returns The result(s) of the post
     */
    postManual(serverCount: number, service?: Service): Promise<object | object[]>
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
   * Represents the discordbots.org service
   * @see https://discordbots.org/api/docs
   */
  export class DiscordBotsOrg extends ServiceBase {
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
   * Represents the ls.terminal.ink's service
   * @see https://ls.terminal.ink/docs/v1
   */
  export class lsTerminalInk extends ServiceBase {
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
  //#endregion


  export interface Constants {
    PostFormat: {
      discordbotsgg: (token: string, clientID: string, serverCount: number, shard?: Shard) => RequestFormat
      discordbotsorg: (token: string, clientID: string, serverCount: number, shard?: Shard) => RequestFormat
      lsterminalink: (token: string, clientID: string, serverCount: number) => RequestFormat
      botsfordiscord: (token: string, clientID: string, serverCount: number) => RequestFormat
      botsondiscord: (token: string, clientID: string, serverCount: number) => RequestFormat
      listcord: (token: string, clientID: string, serverCount: number) => RequestFormat
      carbon: (token: string, _: any, serverCount: number) => RequestFormat
    }

    AvailableServices: string[]
    SupportingLibraries: string[]

    ServerCountFunctions: {
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