import { AxiosRequestConfig, AxiosResponse } from 'axios'

type Library = 'discordie' | 'discord.io' | 'discord.js' | 'eris'
type Service = 'arcane' | 'botlistspace' | 'botsfordiscord' | 'botsondiscord' | 'carbon' | 'cloudbotList' | 'cloudlist' | 'dblista' | 'discordappsdev' | 'discordboats' | 'discordbotlist' | 'discordbotsgg' | 'discordbotworld' | 'divinediscordbots' | 'glennbotlist' | 'topgg' | 'yabl'
type CustomEvent = 'autopost' | 'autopostfail' | 'post' | 'postfail'
type AnyClient = Discordie | DiscordIO | DiscordJS | Eris

export class ServiceBase {
  constructor(token: string)
  token: string
  static readonly aliases: string[]
  static readonly baseURL: string
  static readonly logoURL: string
  static readonly name: string
  static readonly websiteURL: string

  _appendQuery(url: string, query: query, appendBaseURL?: boolean): string
  _request(form: RequestFormat, options?: ServiceRequestOptions): Promise<AxiosResponse>
  static _post(form: RequestFormat, appendBaseURL?: boolean): Promise<AxiosResponse>
  static get(name: Service): ServiceBase | null
}

export class ClientFiller {
  constructor(client: object)
  client: object
  readonly clientID?: number
  readonly serverCount: number
  readonly shard?: number
  readonly userCount: number
  readonly voiceConnections: number
  static get(libraryName: string, client: object): AnyClient
}

export class Discordie extends ClientFiller {}
export class DiscordIO extends ClientFiller {}
export class DiscordJS extends ClientFiller {}
export class Eris extends ClientFiller {
  shard: null
}

interface RequestFormat extends AxiosRequestConfig {
  url: string
  headers?: object
  data?: object
  params?: query
}

interface ServiceRequestOptions {
  requiresToken?: boolean
  appendBaseURL?: boolean
}

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T
}
type keyFormat = PartialRecord<Service, string>

type query = Record<string, string | number>

interface handlerCollector {
  autopost: Array<(result: object | object[]) => void>
  autopostfail: Array<(result: object | object[]) => void>
  post: Array<(result: object) => void>
  postfail: Array<(result: object) => void>
}

interface PostCounts {
  serverCount: number
  userCount?: number
  voiceConnections?: number
}

interface PostOptions extends PostCounts {
  clientID: string
  token: string
  shard?: Shard
}

interface Shard {
  count: number
  id: number
}

interface CustomService {
  aliases: string[]
  post: (options: PostOptions) => Promise<AxiosResponse>
}

declare module 'dbots' {
  /** Data that can be resolved to give a string. This can either be a Function or a Promise */
  type PromiseResolvable = () => string | Promise<string>

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
    useSharding?: boolean
  }

  /** A class that posts server count to listing site(s). */
  export class Poster {
    /** The client filler used in the poster */
    _clientFiller: ClientFiller | null
    /** Interval that posts to all services */
    _interval?: NodeJS.Timeout
    /** The API keys that the poster is using */
    apiKeys: keyFormat
    /** The client that will be used to fecth the stats */
    client?: object
    /** The client filler used in the poster */
    readonly clientFiller?: ClientFiller
    /** An array of custom services that the poster uses */
    customServices: CustomService[]
    /** The list of event handlers for every custom event */
    handlers: handlerCollector
    /** The options the poster was built with */
    readonly options: PosterOptions

    /**
     * A class that posts server count to listing site(s).
     * @param options The options needed to construct the poster
     */
    constructor(options: PosterOptions)

    /**
     * Adds an handler for an event
     * @param event The name of the event to add the handler to
     * @param handler The function that is run with the event
     * @returns The array of handlers currently set for that event
     */
    addHandler(event: 'autopost' | 'autopostfail', handler: (result: AxiosResponse | AxiosResponse[]) => void): PromiseResolvable[]
    addHandler(event: 'post' | 'postfail', handler: (result: AxiosResponse) => void): PromiseResolvable[]
    addHandler(event: CustomEvent, handler: PromiseResolvable): PromiseResolvable[]

    /**
     * Retrieves the current server count of the client/shard.
     * @returns Amount of servers the client/shard is in
     */
    getServerCount(): Promise<number>

    /**
     * Gets a service, autofilling its API key if the poster has it.
     * @param service The service to get
     */
    getService(service: Service): ServiceBase | CustomService

    /**
     * Retrieves the current user count of the client/shard.
     * @returns Amount of users the client/shard is connected with
     */
    getUserCount(): Promise<number>

    /**
     * Retrieves the current voice connection count of the client/shard.
     * @returns Number of active voice connections
     */
    getVoiceConnections(): Promise<number>

    /**
     * Posts the current clients server count to a service.
     * @param service The service to post to
     * @returns The result(s) of the post
     */
    post(service?: Service): Promise<AxiosResponse | AxiosResponse[]>

    /**
     * Manually posts a server count to a service.
     * @param service The service to post to
     * @param counts An object containing the tallies of servers, users and voice connections
     * @param counts.serverCount The server count to post to the service
     * @param counts.userCount The user count to post to the service
     * @param counts.voiceConnections The voice connection count to post to the service
     * @returns The result(s) of the post
     */
    postManual(service?: Service, counts?: PostCounts): Promise<AxiosResponse | AxiosResponse[]>

    /**
     * Adds an handler for an event.
     * @param event The name of the event to add the handler to
     * @param handler The function that is run with the event
     * @returns The array of handlers currently set for that event
     */
    // tslint:disable-next-line
    addHandler(event: 'autopost'|'autopostfail', handler: (error: AxiosResponse | AxiosResponse[]) => void): PromiseResolvable[]
    addHandler(event: 'post'|'postfail', handler: (error: AxiosResponse) => void): PromiseResolvable[]
    addHandler(event: CustomEvent, handler: PromiseResolvable): PromiseResolvable[]

    /**
     * Removes an handler for an event.
     * @param event The name of the event to remove the handler from
     * @param handler The function that is run with the event
     * @returns The array of handlers currently set for that event
     */
    removeHandler(event: 'autopost' | 'autopostfail', handler: (result: AxiosResponse | AxiosResponse[]) => void): PromiseResolvable[]
    removeHandler(event: 'post' | 'postfail', handler: (result: AxiosResponse) => void): PromiseResolvable[]
    removeHandler(event: CustomEvent, handler: PromiseResolvable): PromiseResolvable[]

    /**
     * Manually triggers an event with custom arguments.
     * @param event The name of the event to run the handlers for
     * @param args The arguments to pass to the handlers
     */
    runHandlers(event: 'autopost' | 'autopostfail', result: AxiosResponse | AxiosResponse[]): void
    runHandlers(event: 'post' | 'postfail', result: AxiosResponse): void
    runHandlers(event: CustomEvent, ...args: any[]): void

    /**
     * Creates an interval that posts to all services
     * @param interval The time (in ms) to reach to post to all {link  Service}s again.
     * @returns The interval that is responsible for posting
     */
    startInterval(interval?: number): NodeJS.Timeout

    /** Destroys the current interval */
    stopInterval(): void
  }

  // #region services
  /**
   * Represents the Arcane Bot Center service.
   * @see https://arcane-botcenter.xyz/documentation
   */
  export class Arcane extends ServiceBase {
    /**
     * Posts statistics to this service.
     * @param options The options of the request
     * @param options.token The Authorization token for the request
     * @param options.clientID The client ID that the request will post for
     * @param options.serverCount The amount of servers that the client is in
     * @param options.userCount The amount of users that the client cached
     * @param options.shard The shard the request is representing
     */
    static post(options: PostOptions): Promise<AxiosResponse>
  }

  /**
   * Represents the botlist.space service.
   * @see https://docs.botlist.space/
   */
  export class BotListSpace extends ServiceBase {
    /** Gets a list of bots on this service. */
    getBots(): Promise<AxiosResponse>

    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    getBot(id: string): Promise<AxiosResponse>

    /**
     * Gets the list of people who voted this bot on this service.
     * @param id The bot's ID
     */
    getBotVotes(id: string): Promise<AxiosResponse>

    /**
     * Gets the uptime of a bot listed on this service.
     * @param id The bot's ID
     */
    getBotUptime(id: string): Promise<AxiosResponse>

    /**
     * Gets the widget URL for this bot
     * @param id The bot's ID.
     * @param style The style of the widget
     * @param query The querystring that will be used in the request
     */
    getBotWidget(id: string, style?: number, query?: query): string

    /** Gets the statistics of this service. */
    getStatistics(): Promise<AxiosResponse>

    /**
     * Gets the user listed on this service.
     * @param id The user's ID
     */
    getUser(id: string): Promise<AxiosResponse>

    /**
     * Gets the user's bots listed for this service.
     * @param id The user's ID
     */
    getUserBots(id: string): Promise<AxiosResponse>

    /**
     * Posts statistics to this service.
     * @param options The options of the request
     * @param options.token The Authorization token for the request
     * @param options.clientID The client ID that the request will post for
     * @param options.serverCount The amount of servers that the client is in
     */
    static post(options: PostOptions): Promise<AxiosResponse>
  }

  /**
   * Represents the Bots For Discord service
   * @see https://docs.botsfordiscord.com/
   */
  export class BotsForDiscord extends ServiceBase {
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    getBot(id: string): Promise<AxiosResponse>

    /**
     * Gets the list of people who voted this bot on this service.
     * @param id The bot's ID
     */
    getBotVotes(id: string): Promise<AxiosResponse>

    /**
     * Gets the widget URL for this bot
     * @param id The bot's ID.
     * @param query The querystring that will be used in the request
     */
    getBotWidget(id: string, query?: query): string

    /**
     * Gets the user listed on this service.
     * @param id The user's ID
     */
    getUser(id: string): Promise<AxiosResponse>

    /**
     * Gets the user's bots listed for this service.
     * @param id The user's ID
     */
    getUserBots(id: string): Promise<AxiosResponse>

    /**
     * Posts statistics to this service.
     * @param options The options of the request
     * @param options.token The Authorization token for the request
     * @param options.clientID The client ID that the request will post for
     * @param options.serverCount The amount of servers that the client is in
     */
    static post(options: PostOptions): Promise<AxiosResponse>
  }

  /**
   * Represents the Bots On Discord service
   * @see https://bots.ondiscord.xyz/info/api
   */
  export class BotsOnDiscord extends ServiceBase {
    /**
     * Checks whether or not a user has reviewed a bot.
     * @param id The bot's ID
     * @param userId The user's ID
     */
    checkReview(id: string, userId: string): Promise<AxiosResponse>

    /**
     * Gets the widget URL for this bot.
     * @param id The bot's ID
     * @param query The query string that will be used in the request
     */
    getBotWidget(id: string, query?: query): string

    /**
     * Posts statistics to this service
     * @param options The options of the request
     * @param options.token The Authorization token for the request
     * @param options.clientID The client ID that the request will post for
     * @param options.serverCount The amount of servers that the client is in
     */
    static post(options: PostOptions): Promise<AxiosResponse>
  }

  /**
   * Represents the Carbonitex service.
   */
  export class Carbon extends ServiceBase {
    /** Gets a list of bots on this service. */
    getBots(): Promise<AxiosResponse>

    /**
     * Posts statistics to this service.
     * @param options The options of the request
     * @param options.token The Authorization token for the request (this automatically determines what client its posting for)
     * @param options.serverCount The amount of servers that the client is in
     */
    static post(options: PostOptions): Promise<AxiosResponse>
  }

  /**
   * Represents the Cloud Botlist service.
   * @see https://apollos.gitbook.io/cloud-botlist/
   */
  export class CloudBotList extends ServiceBase {
    /**
     * Posts statistics to this service.
     * @param options The options of the request
     * @param options.token The Authorization token for the request
     * @param options.clientID The client ID that the request will post for
     * @param options.serverCount The amount of servers that the client is in
     * @param options.userCount The amount of users that the client cached
     */
    static post(options: PostOptions): Promise<AxiosResponse>

    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    getBot(id: string): Promise<AxiosResponse>
  }

  /**
   * Represents the Cloud List service.
   * @see https://www.cloudlist.xyz/apidocs
   */
  export class CloudList extends ServiceBase {
    /**
     * Posts statistics to this service.
     * @param options The options of the request
     * @param options.token The Authorization token for the request
     * @param options.clientID The client ID that the request will post for
     * @param options.serverCount The amount of servers that the client is in
     */
    static post(options: PostOptions): Promise<AxiosResponse>

    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    getBot(id: string): Promise<AxiosResponse>

    /**
     * Gets the list of people who voted this bot on this service.
     * @param id The bot's ID
     */
    getBotVotes(id: string): Promise<AxiosResponse>
  }

  /**
   * Represents the DBLista service.
   * @see https://docs.dblista.pl/
   */
  export class DBLista extends ServiceBase {
    /**
     * This service does not support posting.
     * The promise returned will be rejected with an error.
     */
    static post(): Promise<Error>

    /**
     * Adds a bot to the service.
     * @param data The data being posted. This should include the ID of the bot
     */
    addBot(data: object): Promise<AxiosResponse>

    /**
     * Updates the bot's listing with the data provided.
     * @param data The data being posted. This should include the ID of the bot
     */
    updateBot(data: object): Promise<AxiosResponse>

    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    getBot(id: string): Promise<AxiosResponse>

    /**
     * Gets a list of bots on this service.
     * @param page The page you want to get
     */
    getBots(page?: number): Promise<AxiosResponse>

    /** Gets a list of unverified bots on this service. */
    getUnverifiedBots(): Promise<AxiosResponse>

    /** Gets a list of rejected bots on this service. */
    getRejectedBots(): Promise<AxiosResponse>

    /**
     * Adds a rating to a bot on the service.
     * @param id The bot's ID
     * @param data The data being posted. This should include the ID of the bot
     */
    rateBot(id: string, data: object): Promise<AxiosResponse>

    /**
     * Removes a rating from a bot on the service.
     * @param id The bot's ID
     */
    removeRating(id: string): Promise<AxiosResponse>

    /**
     * Removes a bot from the service.
     * @param id The bot's ID
     */
    removeBot(id: string): Promise<AxiosResponse>

    /**
     * Searches for bots on the service.
     * @param query The query to search for
     */
    search(query: string): Promise<AxiosResponse>
  }

  /**
   * Represents the Discord Apps service.
   * @see https://discordapps.dev/en-GB/posts/docs/api-v2/
   */
  export class DiscordAppsDev extends ServiceBase {
    /** Gets a list of applications on this service */
    getApps(): Promise<AxiosResponse>

    /**
     * Gets the bot listed for this service
     * @param id The bot's ID.
     */
    getBot(id: string): Promise<AxiosResponse>

    /** Gets a list of RPC applications on this service. */
    getRPCApps(): Promise<AxiosResponse>

    /**
     * Posts statistics to this service
     * @param options The options of the request
     * @param options.token The Authorization token for the request (this automatically determines what client its posting for)
     * @param options.serverCount The amount of servers that the client is in
     */
    static post(options: PostOptions): Promise<AxiosResponse>

    /**
     * Updates the bot with the data provided.
     * @param id The bot's ID
     * @param data The data being posted
     */
    updateBot(id: string, data: object): Promise<AxiosResponse>
  }

  /**
   * Represents the Discord Boats service.
   * @see https://discord.boats/api/docs
   */
  export class DiscordBoats extends ServiceBase {
    /**
     * Gets the bot listed for this service
     * @param id The bot's ID.
     */
    getBot(id: string): Promise<AxiosResponse>

    /**
     * Gets the widget URL for this bot
     * @param id The bot's ID.
     * @param query The querystring that will be used in the request
     */
    getBotWidget(id: string, query?: query): string

    /**
     * Gets the user listed on this service.
     * @param id The user's ID
     */
    getUser(id: string): Promise<AxiosResponse>

    /**
     * Checks whether or not a user has voted for a bot on this service.
     * @param id The bot's ID
     * @param userID The user's ID
     */
    userVoted(id: string, userID: string): Promise<AxiosResponse>

    /**
     * Posts statistics to this service.
     * @param options The options of the request
     * @param options.token The Authorization token for the request (this automatically determines what client its posting for)
     * @param options.serverCount The amount of servers that the client is in
     */
    static post(options: PostOptions): Promise<AxiosResponse>
  }

  /**
   * Represents the Discord Bot List service.
   * @see https://discordbotlist.com/api-docs
   */
  export class DiscordBotList extends ServiceBase {
    /**
     * Gets the widget URL for this bot.
     * @param id The bot's ID.
     * @param query The querystring that will be used in the request
     */
    getBotWidget(id: string, query?: query): string

    /**
     * Posts statistics to this service.
     * @param options The options of the request
     * @param options.token The Authorization token for the request
     * @param options.clientID The client ID that the request will post for
     * @param options.serverCount The amount of servers that the client is in
     * @param options.userCount The amount of users that the client cached
     * @param options.voiceConnections The amount of voice connections the client has
     * @param options.shard The shard the request is representing
     */
    static post(options: PostOptions): Promise<AxiosResponse>
  }

  /**
   * Represents the Discord Bots service.
   * @see https://discord.bots.gg/docs
   */
  export class DiscordBotsGG extends ServiceBase {
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     * @param sanitized Whether to sanitize descriptions
     */
    getBot(id: string, sanitized?: boolean): Promise<AxiosResponse>

    /** Gets a list of bots on this service. */
    getBots(query: any): Promise<AxiosResponse>

    /**
     * Posts statistics to this service.
     * @param options The options of the request
     * @param options.token The Authorization token for the request
     * @param options.clientID The client ID that the request will post for
     * @param options.serverCount The amount of servers that the client is in
     * @param options.shard The shard the request is representing
     */
    static post(options: PostOptions): Promise<AxiosResponse>
  }

  /**
   * Represents the discordbot.world's service.
   * @see https://discordbot.world/docs
   */
  export class DiscordBotWorld extends ServiceBase {
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    getBot(id: string): Promise<AxiosResponse>

    /**
     * Gets the list of people who liked this bot on this service.
     * @param id The bot's ID
     */
    getBotLikes(id: string): Promise<AxiosResponse>

    /**  Gets a list of bots on this service */
    getBots(): Promise<AxiosResponse>

    /**
     * Gets the bot's stats on this service.
     * @param id The bot's ID
     */
    getBotStats(id: string): Promise<AxiosResponse>

    /**
     * Gets the user listed on this service.
     * @param id The user's ID
     */
    getUser(id: string): Promise<AxiosResponse>

    /**
     * Posts statistics to this service.
     * @param options The options of the request
     * @param options.token The Authorization token for the request
     * @param options.clientID The client ID that the request will post for
     * @param options.serverCount The amount of servers that the client is in
     */
    static post(options: PostOptions): Promise<AxiosResponse>
  }

  /**
   * Represents the Discord Extreme List service.
   * @see https://docs.discordextremelist.xyz/
   */
  export class DiscordExtremeList extends ServiceBase {
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    getBot(id: string): Promise<AxiosResponse>

    /**
     * Gets the widget URL for this bot.
     * @param id The bot's ID
     * @param query The query string that will be used in the request
     */
    getBotWidget(id: string, query?: object): string

    /** Gets the statistics of this service. */
    getStatistics(): Promise<AxiosResponse>

    /**
     * Gets the user listed on this service.
     * @param id The user's ID
     */
    getUser(id: string): Promise<AxiosResponse>

    /**
     * Posts statistics to this service.
     * @param options The options of the request
     * @param options.token The Authorization token for the request
     * @param options.clientID The client ID that the request will post for
     * @param options.serverCount The amount of servers that the client is in
     */
    static post(options: PostOptions): Promise<AxiosResponse>
  }

  /**
   * Represents the divinediscordbots.com's service
   * @see https://divinediscordbots.com/api
   */
  export class DivineDiscordBots extends ServiceBase {
    /**
     * Gets the statistics of your bot on this service.
     * @param id The bot's ID
     */
    getBotStats(id: string): Promise<AxiosResponse>

    /**
     * Gets the list of people who voted this bot on this service.
     * @param id The bot's ID
     */
    getBotVotes(id: string): Promise<AxiosResponse>

    /**
     * Gets the widget URL for this bot.
     * @param id The bot's ID
     * @param query The query string that will be used in the request
     */
    getBotWidget(id: string, query?: query): string

    /**
     * Posts statistics to this service.
     * @param options The options of the request
     * @param options.token The Authorization token for the request
     * @param options.clientID The client ID that the request will post for
     * @param options.serverCount The amount of servers that the client is in
     */
    static post(options: PostOptions): Promise<AxiosResponse>
  }

  /**
   * Represents the Glenn Bot List service
   * @see https://docs.glennbotlist.xyz/
   */
  export class GlennBotList extends ServiceBase {
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    getBot(id: string): Promise<AxiosResponse>

    /**
     * Gets the list of people who voted this bot on this service.
     * @param id The bot's ID
     */
    getBotVotes(id: string): Promise<AxiosResponse>

    /**
     * Gets the widget URL for this bot.
     * @param id The bot's ID
     * @param query The query string that will be used in the request
     */
    getBotWidget(id: string, query?: query): string

    /**
     * Get a user's profile listed on this service
     * @param id The user's ID.
     */
    getProfile(id: string): Promise<AxiosResponse>

    /**
     * Posts statistics to this service.
     * @param options The options of the request
     * @param options.token The Authorization token for the request
     * @param options.clientID The client ID that the request will post for
     * @param options.serverCount The amount of servers that the client is in
     */
    static post(options: PostOptions): Promise<AxiosResponse>
  }

  /**
   * Represents the top.gg service
   * @see https://top.gg/api/docs
   */
  export class TopGG extends ServiceBase {
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    getBot(id: string): Promise<AxiosResponse>

    /**
     * Gets the list of bots on this service.
     * @param query The query string that will be used in the request
     */
    getBots(query: query): Promise<AxiosResponse>

    /**
     * Gets the bot's stats listed on this service.
     * @param id The bot's ID
     */
    getBotStats(id: string): Promise<AxiosResponse>

    /**
     * Gets the list of people who voted this bot on this service.
     * @param id The bot's ID
     * @param query The query string that will be used in the request
     */
    getBotVotes(id: string, query: query): Promise<AxiosResponse>

    /**
     * Gets the widget URL for this bot.
     * @param id The bot's ID
     * @param query The query string that will be used in the request
     */
    getBotWidget(id: string, query?: query): string

    /**
     * Gets the user listed for this service
     * @param id The user's ID.
     */
    getUser(id: string): Promise<AxiosResponse>

    /**
     * Posts statistics to this service.
     * @param options The options of the request
     * @param options.token The Authorization token for the request
     * @param options.clientID The client ID that the request will post for
     * @param options.serverCount The amount of servers that the client is in
     * @param options.shard The shard the request is representing
     */
    static post(options: PostOptions): Promise<AxiosResponse>
  }

  /**
   * Represents the YABL service.
   * @see https://yabl.xyz/api
   */
  export class YABL extends ServiceBase {
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    getBot(id: string): Promise<AxiosResponse>

    /** Gets a list of bots on this service. */
    getBots(): Promise<AxiosResponse>

    /**
     * Gets a page of bots on this service.
     * @param query The query string that will be used in the request
     */
    getBotsByPage(query: query): Promise<AxiosResponse>

    /** Gets 20 random bots from this service. */
    getRandomBots(): Promise<AxiosResponse>

    /** Gets a list of unverified bots on this service. */
    getUnverifiedBots(): Promise<AxiosResponse>

    /**
     * Gets the user's bots listed for this service.
     * @param id The user's ID
     */
    getUserBots(id: string): Promise<AxiosResponse>

    /** Invalidates the token being used in the request */
    invalidate(): Promise<AxiosResponse>

    /**
     * Posts statistics to this service
     * @param options The options of the request
     * @param options.token The Authorization token for the request
     * @param options.clientID The client ID that the request will post for
     * @param options.serverCount The amount of servers that the client is in
     */
    static post(options: PostOptions): Promise<AxiosResponse>
  }
  // #endregion

  export interface Constants {
    Package: object
    SupportedEvents: string[]
  }

  export function EnsurePromise(func: () => any, ...args: any[]): Promise<AxiosResponse>

  export function FormatRequest(options: RequestFormat): Promise<AxiosResponse>

  export function getService(name: Service): ServiceBase | null
}
