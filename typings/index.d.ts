/**
 * Represents the Arcane Bot Center service.
 * @param token - The token/key for the service
 */
export class Arcane extends ServiceBase {
    constructor(token: string);
    /**
     * Posts statistics to this service.
     * @param options - The options of the request
     * @param options.token - The Authorization token for the request
     * @param options.clientID - The client ID that the request will post for
     * @param options.serverCount - The amount of servers that the client is in
     * @param options.userCount - The amount of users that the client cached
     * @param options.shard - The shard the request is representing
     */
    static post(options: {
        token: string;
        clientID: IDResolvable;
        serverCount: CountResolvable;
        userCount: CountResolvable;
        shard: Shard;
    }): Promise<AxiosResponse>
}

/**
 * Represents the Blist service.
 * @param token - The token/key for the service
 */
export class Blist extends ServiceBase {
    constructor(token: string);
    /**
     * Posts statistics to this service.
     * @param options - The options of the request
     * @param options.token - The Authorization token for the request
     * @param options.clientID - The client ID that the request will post for
     * @param options.serverCount - The amount of servers that the client is in
     * @param options.shard - The shard the request is representing
     */
    static post(options: {
        token: string;
        clientID: IDResolvable;
        serverCount: CountResolvable;
        shard: Shard;
    }): Promise<AxiosResponse>
    /**
     * Gets the user listed on this service.
     * @param id - The user's ID
     */
    getUser(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the bot listed on this service.
     * @param id - The bot's ID
     */
    getBot(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the list of people who voted this bot on this service.
     * @param id - The bot's ID
     */
    getBotVotes(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the widget URL for this bot.
     * @param id - The bot's ID
     * @param [query] - The query string that will be used in the request
     */
    getWidgetURL(id: IDResolvable, query?: Query): string
}

/**
 * Represents the botlist.space service.
 * @param token - The token/key for the service
 */
export class BotListSpace extends ServiceBase {
    constructor(token: string);
    /**
     * Posts statistics to this service.
     * <warn>Shard data posting is not supported for this service.</warn>
     * @param options - The options of the request
     * @param options.token - The Authorization token for the request
     * @param options.clientID - The client ID that the request will post for
     * @param options.serverCount - The amount of servers that the client is in
     */
    static post(options: {
        token: string;
        clientID: IDResolvable;
        serverCount: CountResolvable;
    }): Promise<AxiosResponse>
    /**
     * Gets the statistics of this service.
     */
    getStatistics(): Promise<AxiosResponse>
    /**
     * Gets a list of bots on this service.
     */
    getBots(): Promise<AxiosResponse>
    /**
     * Gets the bot listed on this service.
     * @param id - The bot's ID
     */
    getBot(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the list of people who voted this bot on this service.
     * @param id - The bot's ID
     */
    getBotVotes(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the uptime of a bot listed on this service.
     * @param id - The bot's ID
     */
    getBotUptime(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the user listed on this service.
     * @param id - The user's ID
     */
    getUser(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the user's bots listed for this service.
     * @param id - The user's ID
     */
    getUserBots(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the widget URL for this bot.
     * @param id - The bot's ID
     * @param [style = 1] - The style of the widget, cannot be zero
     * @param [query] - The query string that will be used in the request
     */
    getWidgetURL(id: IDResolvable, style?: CountResolvable, query?: Query): string
}

/**
 * Represents the BotsDataBase service.
 * @param token - The token/key for the service
 */
export class BotsDataBase extends ServiceBase {
    constructor(token: string);
    /**
     * Posts statistics to this service.
     * <warn>Shard data posting is not supported for this service.</warn>
     * @param options - The options of the request
     * @param options.token - The Authorization token for the request
     * @param options.clientID - The client ID that the request will post for
     * @param options.serverCount - The amount of servers that the client is in
     */
    static post(options: {
        token: string;
        clientID: IDResolvable;
        serverCount: CountResolvable;
    }): Promise<AxiosResponse>
    /**
     * Gets the user listed on this service.
     * @param id - The user's ID
     */
    getUser(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the bot listed on this service.
     * @param id - The bot's ID
     */
    getBot(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the list of people who voted this bot on this service.
     * @param id - The bot's ID
     */
    getBotVotes(id: IDResolvable): Promise<AxiosResponse>
}

/**
 * Represents the Bots For Discord service.
 * @param token - The token/key for the service
 */
export class BotsForDiscord extends ServiceBase {
    constructor(token: string);
    /**
     * Posts statistics to this service.
     * <warn>Shard data posting is not supported for this service.</warn>
     * @param options - The options of the request
     * @param options.token - The Authorization token for the request
     * @param options.clientID - The client ID that the request will post for
     * @param options.serverCount - The amount of servers that the client is in
     */
    static post(options: {
        token: string;
        clientID: IDResolvable;
        serverCount: CountResolvable;
    }): Promise<AxiosResponse>
    /**
     * Gets the bot listed on this service.
     * @param id - The bot's ID
     */
    getBot(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the list of people who voted this bot on this service.
     * @param id - The bot's ID
     */
    getBotVotes(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the user listed on this service.
     * @param id - The user's ID
     */
    getUser(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the user's bots listed for this service.
     * @param id - The user's ID
     */
    getUserBots(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the widget URL for this bot.
     * @param id - The bot's ID
     * @param [query] - The query string that will be used in the request
     */
    getWidgetURL(id: IDResolvable, query?: Query): string
}

/**
 * Represents the Bots On Discord service.
 * @param token - The token/key for the service
 */
export class BotsOnDiscord extends ServiceBase {
    constructor(token: string);
    /**
     * Posts statistics to this service.
     * <warn>Shard data posting is not supported for this service.</warn>
     * @param options - The options of the request
     * @param options.token - The Authorization token for the request
     * @param options.clientID - The client ID that the request will post for
     * @param options.serverCount - The amount of servers that the client is in
     */
    static post(options: {
        token: string;
        clientID: IDResolvable;
        serverCount: CountResolvable;
    }): Promise<AxiosResponse>
    /**
     * Checks whether or not a user has reviewed a bot.
     * @param id - The bot's ID
     * @param userId - The user's ID
     */
    checkReview(id: IDResolvable, userId: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the widget URL for this bot.
     * @param id - The bot's ID
     * @param [query] - The query string that will be used in the request
     */
    getWidgetURL(id: IDResolvable, query?: Query): string
}

/**
 * Represents the Carbonitex service.
 * @param token - The token/key for the service
 */
export class Carbon extends ServiceBase {
    constructor(token: string);
    /**
     * Posts statistics to this service.
     * <warn>Shard data posting is not supported for this service.</warn>
     * @param options - The options of the request
     * @param options.token - The Authorization token for the request (this automatically determines what client its posting for)
     * @param options.serverCount - The amount of servers that the client is in
     */
    static post(options: {
        token: string;
        serverCount: CountResolvable;
    }): Promise<AxiosResponse>
    /**
     * Gets a list of bots on this service.
     */
    getBots(): Promise<AxiosResponse>
}

/**
 * Represents the DBLista service.
 * @param token - The token/key for the service
 */
export class DBLista extends ServiceBase {
    constructor(token: string);
    /**
     * Adds a bot to the service.
     * @param data - The data being posted. This should include the ID of the bot
     */
    addBot(data: any): Promise<AxiosResponse>
    /**
     * Updates the bot's listing with the data provided.
     * @param data - The data being posted. This should include the ID of the bot
     */
    updateBot(data: any): Promise<AxiosResponse>
    /**
     * Gets the bot listed on this service.
     * @param id - The bot's ID
     */
    getBot(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets a list of bots on this service.
     * @param [page = 0] - The page you want to get
     */
    getBots(page?: CountResolvable): Promise<AxiosResponse>
    /**
     * Gets a list of unverified bots on this service.
     */
    getUnverifiedBots(): Promise<AxiosResponse>
    /**
     * Gets a list of rejected bots on this service.
     */
    getRejectedBots(): Promise<AxiosResponse>
    /**
     * Adds a rating to a bot on the service.
     * @param id - The bot's ID
     * @param data - The data being posted
     */
    rateBot(id: IDResolvable, data: any): Promise<AxiosResponse>
    /**
     * Removes a rating from a bot on the service.
     * @param id - The bot's ID
     */
    removeRating(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Removes a bot from the service.
     * @param id - The bot's ID
     */
    removeBot(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Searches for bots on the service.
     * @param query - The query to search for
     */
    search(query: string): Promise<AxiosResponse>
}

/**
 * Represents the Discord Apps service.
 * @param token - The token/key for the service
 */
export class DiscordAppsDev extends ServiceBase {
    constructor(token: string);
    /**
     * Posts statistics to this service.
     * <warn>Shard data posting is not supported for this service.</warn>
     * @param options - The options of the request
     * @param options.token - The Authorization token for the request
     * @param options.clientID - The client ID that the request will post for
     * @param options.serverCount - The amount of servers that the client is in
     */
    static post(options: {
        token: string;
        clientID: IDResolvable;
        serverCount: CountResolvable;
    }): Promise<AxiosResponse>
    /**
     * Gets a list of bots on this service.
     */
    getBots(): Promise<AxiosResponse>
    /**
     * Gets a list of applications on this service.
     */
    getApps(): Promise<AxiosResponse>
    /**
     * Gets a list of RPC applications on this service.
     */
    getRPCApps(): Promise<AxiosResponse>
    /**
     * Gets the bot listed on this service.
     * @param id - The bot's ID
     */
    getBot(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Updates the bot with the data provided.
     * @param id - The bot's ID
     * @param data - The data being posted
     */
    updateBot(id: IDResolvable, data: any): Promise<AxiosResponse>
}

/**
 * Represents the Discord Boats service.
 * @param token - The token/key for the service
 */
export class DiscordBoats extends ServiceBase {
    constructor(token: string);
    /**
     * Posts statistics to this service.
     * <warn>Shard data posting is not supported for this service.</warn>
     * @param options - The options of the request
     * @param options.token - The Authorization token for the request
     * @param options.clientID - The client ID that the request will post for
     * @param options.serverCount - The amount of servers that the client is in
     */
    static post(options: {
        token: string;
        clientID: IDResolvable;
        serverCount: CountResolvable;
    }): Promise<AxiosResponse>
    /**
     * Gets the bot listed on this service.
     * @param id - The bot's ID
     */
    getBot(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the user listed on this service.
     * @param id - The user's ID
     */
    getUser(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Checks whether or not a user has voted for a bot on this service.
     * @param id - The bot's ID
     * @param userID - The user's ID
     */
    userVoted(id: IDResolvable, userID: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the widget URL for this bot.
     * @param id - The bot's ID
     * @param [query] - The query string that will be used in the request
     */
    getWidgetURL(id: IDResolvable, query?: Query): string
}

/**
 * Represents the Discord Bot List service.
 * @param token - The token/key for the service
 */
export class DiscordBotList extends ServiceBase {
    constructor(token: string);
    /**
     * Posts statistics to this service.
     * @param options - The options of the request
     * @param options.token - The Authorization token for the request
     * @param options.clientID - The client ID that the request will post for
     * @param options.serverCount - The amount of servers that the client is in
     * @param options.userCount - The amount of users that the client cached
     * @param options.voiceConnections - The amount of voice connections the client has
     * @param options.shard - The shard the request is representing
     */
    static post(options: {
        token: string;
        clientID: IDResolvable;
        serverCount: CountResolvable;
        userCount: CountResolvable;
        voiceConnections: CountResolvable;
        shard: Shard;
    }): Promise<AxiosResponse>
}

/**
 * Represents the Discord Bot World service.
 * @param token - The token/key for the service
 */
export class DiscordBotWorld extends ServiceBase {
    constructor(token: string);
    /**
     * Posts statistics to this service.
     * <warn>Shard data posting is not supported for this service.</warn>
     * @param options - The options of the request
     * @param options.token - The Authorization token for the request
     * @param options.clientID - The client ID that the request will post for
     * @param options.serverCount - The amount of servers that the client is in
     */
    static post(options: {
        token: string;
        clientID: IDResolvable;
        serverCount: CountResolvable;
    }): Promise<AxiosResponse>
    /**
     * Gets a list of bots on this service.
     */
    getBots(): Promise<AxiosResponse>
    /**
     * Gets the bot listed on this service.
     * @param id - The bot's ID
     */
    getBot(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the bot's stats on this service.
     * @param id - The bot's ID
     */
    getBotStats(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the list of people who liked this bot on this service.
     * @param id - The bot's ID
     */
    getBotLikes(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the user listed on this service.
     * @param id - The user's ID
     */
    getUser(id: IDResolvable): Promise<AxiosResponse>
}

/**
 * Represents the DiscordBots.co service.
 * @param token - The token/key for the service
 */
export class DiscordBotsCo extends ServiceBase {
    constructor(token: string);
    /**
     * Posts statistics to this service.
     * @param options - The options of the request
     * @param options.token - The Authorization token for the request
     * @param options.clientID - The client ID that the request will post for
     * @param options.serverCount - The amount of servers that the client is in
     * @param options.shard - The shard the request is representing
     */
    static post(options: {
        token: string;
        clientID: IDResolvable;
        serverCount: CountResolvable;
        shard: Shard;
    }): Promise<AxiosResponse>
    /**
     * Gets the bot listed on this service.
     * @param id - The bot's ID
     */
    getBot(id: IDResolvable): Promise<AxiosResponse>
}

/**
 * Represents the Discord Bots service.
 * @param token - The token/key for the service
 * @param options - The options of the service. Providing this is highly recommended.
 * @param options.library - The bot's library
 * @param options.clientID - The bot ID for the user agent
 */
export class DiscordBotsGG extends ServiceBase {
    constructor(token: string, options: {
        library: string;
        clientID: IDResolvable;
    });
    /**
     * Creates a compliant user agent to use for any API calls to Discord Bots.
     * @param botID - The ID of the bot that the agent will be identified with
     * @param [library = unknown] - The library the agent is using
     */
    static userAgent(botID: IDResolvable, library?: string): string
    /**
     * Posts statistics to this service.
     * @param options - The options of the request
     * @param options.token - The Authorization token for the request
     * @param options.clientID - The client ID that the request will post for
     * @param options.serverCount - The amount of servers that the client is in
     * @param options.shard - The shard the request is representing
     */
    static post(options: {
        token: string;
        clientID: IDResolvable;
        serverCount: CountResolvable;
        shard: Shard;
    }): Promise<AxiosResponse>
    /**
     * Gets the bot listed on this service.
     * @param id - The bot's ID
     * @param [sanitized = false] - Whether to sanitize descriptions
     */
    getBot(id: IDResolvable, sanitized?: boolean): Promise<AxiosResponse>
    /**
     * Gets a list of bots on this service.
     * @param [query] - The query string that will be used in the request
     */
    getBots(query?: Query): Promise<AxiosResponse>
}

/**
 * Represents the Discord Extreme List service.
 * @param token - The token/key for the service
 */
export class DiscordExtremeList extends ServiceBase {
    constructor(token: string);
    /**
     * Posts statistics to this service.
     * @param options - The options of the request
     * @param options.token - The Authorization token for the request
     * @param options.clientID - The client ID that the request will post for
     * @param options.serverCount - The amount of servers that the client is in
     * @param options.shard - The shard the request is representing
     */
    static post(options: {
        token: string;
        clientID: IDResolvable;
        serverCount: CountResolvable;
        shard: Shard;
    }): Promise<AxiosResponse>
    /**
     * Gets the statistics of this service.
     */
    getStatistics(): Promise<AxiosResponse>
    /**
     * Gets the bot listed on this service.
     * @param id - The bot's ID
     */
    getBot(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the user listed on this service.
     * @param id - The bot's ID
     */
    getUser(id: IDResolvable): Promise<AxiosResponse>
}

/**
 * Represents the Discord Labs service.
 * @param token - The token/key for the service
 */
export class DiscordLabs extends ServiceBase {
    constructor(token: string);
    /**
     * Posts statistics to this service.
     * @param options - The options of the request
     * @param options.token - The Authorization token for the request
     * @param options.clientID - The client ID that the request will post for
     * @param options.serverCount - The amount of servers that the client is in
     * @param options.shard - The shard the request is representing
     */
    static post(options: {
        token: string;
        clientID: IDResolvable;
        serverCount: CountResolvable;
        shard: Shard;
    }): Promise<AxiosResponse>
    /**
     * Gets the bot listed on this service.
     * @param id - The bot's ID
     */
    getBot(id: IDResolvable): Promise<AxiosResponse>
}

/**
 * Represents the DiscordListology service.
 * @param token - The token/key for the service
 */
export class DiscordListology extends ServiceBase {
    constructor(token: string);
    /**
     * Posts statistics to this service.
     * @param options - The options of the request
     * @param options.token - The Authorization token for the request
     * @param options.clientID - The client ID that the request will post for
     * @param options.serverCount - The amount of servers that the client is in
     * @param options.shard - The shard the request is representing
     */
    static post(options: {
        token: string;
        clientID: IDResolvable;
        serverCount: CountResolvable;
        shard: Shard;
    }): Promise<AxiosResponse>
    /**
     * Gets the bot's stats listed on this service.
     * @param id - The bot's ID
     */
    getBotStats(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Checks whether or not a user has voted for a bot on this service.
     * @param id - The bot's ID
     * @param userID - The user's ID
     */
    userVotedBot(id: IDResolvable, userID: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the guild's stats listed on this service.
     * @param id - The guild's ID
     */
    getGuildStats(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Checks whether or not a user has voted for a guild on this service.
     * @param id - The guild's ID
     * @param userID - The user's ID
     */
    userVotedGuild(id: IDResolvable, userID: IDResolvable): Promise<AxiosResponse>
}

/**
 * Represents the Discord Services service.
 * @param token - The token/key for the service
 */
export class DiscordServices extends ServiceBase {
    constructor(token: string);
    /**
     * Posts statistics to this service.
     * @param options - The options of the request
     * @param options.token - The Authorization token for the request
     * @param options.clientID - The client ID that the request will post for
     * @param options.serverCount - The amount of servers that the client is in
     * @param options.shard - The shard the request is representing
     */
    static post(options: {
        token: string;
        clientID: IDResolvable;
        serverCount: CountResolvable;
        shard: Shard;
    }): Promise<AxiosResponse>
    /**
     * Posts news to your bot page
     * @param id - The bot's ID
     * @param title - The title of the post
     * @param content - The content of the post
     */
    postNews(id: IDResolvable, title: string, content: string): void
    /**
     * Posts commands info to your bot page
     * @param id - The bot's ID
     * @param commands - The command info to post
     */
    postCommands(id: IDResolvable, commands: DiscordServicesCommandInfo[]): void
}

/**
 * @property command - The command name including the prefix
 * @property desc - The description for your command
 * @property category - The category of your command
 */
export interface DiscordServicesCommandInfo {
    command: string
    desc: string
    category: string
}

/**
 * Represents the Glenn Bot List service.
 * @param token - The token/key for the service
 */
export class GlennBotList extends ServiceBase {
    constructor(token: string);
    /**
     * Posts statistics to this service.
     * @param options - The options of the request
     * @param options.token - The Authorization token for the request
     * @param options.clientID - The client ID that the request will post for
     * @param options.serverCount - The amount of servers that the client is in
     */
    static post(options: {
        token: string;
        clientID: IDResolvable;
        serverCount: CountResolvable;
    }): Promise<AxiosResponse>
    /**
     * Gets the bot listed on this service.
     * @param id - The bot's ID
     */
    getBot(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the list of people who voted this bot on this service.
     * @param id - The bot's ID
     */
    getBotVotes(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Get a user's profile listed on this service.
     * @param id - The user's ID
     */
    getUser(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the widget URL for this bot.
     * @param id - The bot's ID
     * @param [query] - The query string that will be used in the request
     */
    getWidgetURL(id: IDResolvable, query?: Query): string
}

/**
 * Represents the LBots service.
 * @param token - The token/key for the service
 */
export class LBots extends ServiceBase {
    constructor(token: string);
    /**
     * Posts statistics to this service.
     * @param options - The options of the request
     * @param options.token - The Authorization token for the request
     * @param options.clientID - The client ID that the request will post for
     * @param options.serverCount - The amount of servers that the client is in
     * @param options.shard - The shard the request is representing
     */
    static post(options: {
        token: string;
        clientID: IDResolvable;
        serverCount: CountResolvable;
        shard: Shard;
    }): Promise<AxiosResponse>
    /**
     * Invalidates the token being used in the request.
     * @param id - The bot's ID
     */
    invalidate(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the list of people who favorited this bot on this service.
     * @param id - The bot's ID
     */
    getBotFavorites(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Checks whether or not a user has favorited a bot on this service.
     * @param id - The bot's ID
     * @param userID - The user's ID
     */
    userFavorited(id: IDResolvable, userID: IDResolvable): Promise<AxiosResponse>
    /**
     * Updates the guilds on the bot's panel.
     * @param id - The bot's ID
     * @param data - The data being posted
     */
    updatePanelGuilds(id: IDResolvable, data: any): Promise<AxiosResponse>
    /**
     * Gets a guilds settings from the bot's panel.
     * @param id - The bot's ID
     * @param guildID - The guild's ID
     */
    getPanelGuildSettings(id: IDResolvable, guildID: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets a guilds settings from the bot's panel.
     * @param id - The bot's ID
     * @param guildID - The guild's ID
     * @param data - The data being posted
     */
    updatePanelGuildSettings(id: IDResolvable, guildID: IDResolvable, data: any): Promise<AxiosResponse>
}

/**
 * Represents the List My Bots service.
 * @param token - The token/key for the service
 */
export class ListMyBots extends ServiceBase {
    constructor(token: string);
    /**
     * Posts statistics to this service.
     * <warn>Shard data posting is not supported for this service.</warn>
     * @param options - The options of the request
     * @param options.token - The Authorization token for the request (this automatically determines what client its posting for)
     * @param options.clientID - The client ID that the request will post for
     * @param options.serverCount - The amount of servers that the client is in
     */
    static post(options: {
        token: string;
        clientID: string;
        serverCount: CountResolvable;
    }): Promise<AxiosResponse>
    /**
     * Gets the bot listed on this service.
     * @param id - The bot's ID
     */
    getBot(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the status widget URL for this bot.
     * @param id - The bot's ID
     * @param [query] - The query string that will be used in the request
     */
    getStatusWidgetURL(id: IDResolvable, query?: Query): string
    /**
     * Gets the user listed on this service.
     * @param id - The user's ID
     */
    getUser(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the info about someone's bots.
     * @param id - The user's ID
     */
    getUserBots(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the widget URL for this bot.
     * @param id - The bot's ID
     * @param [query] - The query string that will be used in the request
     */
    getWidgetURL(id: IDResolvable, query?: Query): string
}

/**
 * Represents the Mythical Bots service.
 * @param token - The token/key for the service
 */
export class MythicalBots extends ServiceBase {
    constructor(token: string);
    /**
     * Posts statistics to this service.
     * <warn>Shard data posting is not supported for this service.</warn>
     * @param options - The options of the request
     * @param options.token - The Authorization token for the request
     * @param options.clientID - The client ID that the request will post for
     * @param options.serverCount - The amount of servers that the client is in
     */
    static post(options: {
        token: string;
        clientID: IDResolvable;
        serverCount: CountResolvable;
    }): Promise<AxiosResponse>
    /**
     * Gets the bot listed on this service.
     * @param id - The bot's ID
     */
    getBot(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the user listed on this service.
     * @param id - The user's ID
     */
    getUser(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the widget URL for this bot.
     * @param id - The bot's ID
     * @param [query] - The query string that will be used in the request
     */
    getWidgetURL(id: IDResolvable, query?: Query): string
}

/**
 * Represents the Space Bots List service.
 * @param token - The token/key for the service
 */
export class SpaceBotsList extends ServiceBase {
    constructor(token: string);
    /**
     * Posts statistics to this service.
     * <warn>Shard data posting is not supported for this service.</warn>
     * @param options - The options of the request
     * @param options.token - The Authorization token for the request
     * @param options.clientID - The client ID that the request will post for
     * @param options.serverCount - The amount of servers that the client is in
     * @param options.userCount - The amount of users that the client cached
     */
    static post(options: {
        token: string;
        clientID: IDResolvable;
        serverCount: CountResolvable;
        userCount: CountResolvable;
    }): Promise<AxiosResponse>
    /**
     * Gets the bot listed on this service.
     * @param id - The bot's ID
     */
    getBot(id: IDResolvable): Promise<AxiosResponse>
}

/**
 * Represents the TopCord service.
 * @param token - The token/key for the service
 */
export class TopCord extends ServiceBase {
    constructor(token: string);
    /**
     * Posts statistics to this service.
     * @param options - The options of the request
     * @param options.token - The Authorization token for the request
     * @param options.clientID - The client ID that the request will post for
     * @param options.serverCount - The amount of servers that the client is in
     * @param options.shard - The shard the request is representing
     */
    static post(options: {
        token: string;
        clientID: IDResolvable;
        serverCount: CountResolvable;
        shard: Shard;
    }): Promise<AxiosResponse>
    /**
     * Gets the bot listed on this service.
     * @param id - The bot's ID
     */
    getBot(id: IDResolvable): Promise<AxiosResponse>
}

/**
 * Represents the Top.gg service.
 * @param token - The token/key for the service
 */
export class TopGG extends ServiceBase {
    constructor(token: string);
    /**
     * Posts statistics to this service.
     * @param options - The options of the request
     * @param options.token - The Authorization token for the request
     * @param options.clientID - The client ID that the request will post for
     * @param options.serverCount - The amount of servers that the client is in
     * @param options.shard - The shard the request is representing
     */
    static post(options: {
        token: string;
        clientID: IDResolvable;
        serverCount: CountResolvable;
        shard: Shard;
    }): Promise<AxiosResponse>
    /**
     * Gets the user listed on this service.
     * @param id - The user's ID
     */
    getUser(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the list of bots on this service.
     * @param query - The query string that will be used in the request
     */
    getBots(query: Query): Promise<AxiosResponse>
    /**
     * Gets the bot listed on this service.
     * @param id - The bot's ID
     */
    getBot(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the bot's stats listed on this service.
     * @param id - The bot's ID
     */
    getBotStats(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the list of people who voted this bot on this service.
     * @param id - The bot's ID
     * @param query - The query string that will be used in the request
     */
    getBotVotes(id: IDResolvable, query: Query): Promise<AxiosResponse>
    /**
     * Checks whether or not a user has voted for a bot on this service.
     * @param id - The bot's ID
     * @param userID - The user's ID
     */
    userVoted(id: IDResolvable, userID: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the widget URL for this bot.
     * @param id - The bot's ID
     * @param [query] - The query string that will be used in the request
     * @param [smallWidget = null] - The sub-path name to turn the widget into a badge (i.e. owner)
     */
    getWidgetURL(id: IDResolvable, query?: Query, smallWidget?: string): string
}

/**
 * Represents the Wonder Bot List service.
 * @param token - The token/key for the service
 */
export class WonderBotList extends ServiceBase {
    constructor(token: string);
    /**
     * Posts statistics to this service.
     * @param options - The options of the request
     * @param options.token - The Authorization token for the request
     * @param options.clientID - The client ID that the request will post for
     * @param options.serverCount - The amount of servers that the client is in
     * @param options.shard - The shard the request is representing
     */
    static post(options: {
        token: string;
        clientID: IDResolvable;
        serverCount: CountResolvable;
        shard: Shard;
    }): Promise<AxiosResponse>
    /**
     * Gets the bot listed on this service.
     * @param id - The bot's ID
     */
    getBot(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets the user listed on this service.
     * @param id - The user's ID
     */
    getUser(id: IDResolvable): Promise<AxiosResponse>
}

/**
 * Represents the YABL service.
 * @param token - The token/key for the service
 */
export class YABL extends ServiceBase {
    constructor(token: string);
    /**
     * Posts statistics to this service.
     * <warn>Shard data posting is not supported for this service.</warn>
     * @param options - The options of the request
     * @param options.token - The Authorization token for the request
     * @param options.clientID - The client ID that the request will post for
     * @param options.serverCount - The amount of servers that the client is in
     */
    static post(options: {
        token: string;
        clientID: IDResolvable;
        serverCount: CountResolvable;
    }): Promise<AxiosResponse>
    /**
     * Invalidates the token being used in the request.
     */
    invalidate(): Promise<AxiosResponse>
    /**
     * Gets the bot listed on this service.
     * @param id - The bot's ID
     */
    getBot(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets 20 random bots from this service.
     */
    getRandomBots(): Promise<AxiosResponse>
    /**
     * Gets the user's bots listed for this service.
     * @param id - The user's ID
     */
    getUserBots(id: IDResolvable): Promise<AxiosResponse>
    /**
     * Gets a list of bots on this service.
     */
    getBots(): Promise<AxiosResponse>
    /**
     * Gets a page of bots on this service.
     * @param query - The query string that will be used in the request
     */
    getBotsByPage(query: Query): Promise<AxiosResponse>
    /**
     * Gets a list of unverified bots on this service.
     */
    getUnverifiedBots(): Promise<AxiosResponse>
}

export class Poster {
    constructor(options: PosterOptions);
    /**
     * The client that will be used to fetch the stats
     */
    client: any
    /**
     * An array of custom services that the poster uses
     */
    customServices: CustomService[]
    /**
     * The API keys that the poster is using
     */
    apiKeys: Record<Service, string>
    /**
     * The options the poster was built with
     */
    readonly options: PosterOptions
    /**
     * The list of event handlers for every custom event
     */
    handlers: Record<CustomEvent, eventHandler[]>
    /**
     * Retrieves the current server count of the client/shard.
     * @returns Amount of servers the client/shard is in
     */
    getServerCount(): Promise<number>
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
     * Creates an interval that posts to all services.
     * @param interval - The time (in ms) to reach to post to all {@link Service}s again
     * @returns The interval that is responsible for posting
     */
    startInterval(interval?: number): NodeJS.Timeout
    /**
     * Destroys the current interval.
     */
    stopInterval(): void
    /**
     * Gets a service, autofilling its API key if the poster has it.
     * @param service - The service to get
     */
    getService(service: Service): ServiceBase | CustomService
    /**
     * Posts the current clients server count to a service.
     * @param [service] - The service to post to
     * @returns The result(s) of the post
     */
    post(service?: Service | "all"): Promise<object | object[]>
    /**
     * Manually posts a server count to a service.
     * @param service - The service to post to
     * @param counts - An object containing the tallies of servers, users and voice connections
     * @param counts.serverCount - The server count to post to the service
     * @param [counts.userCount] - The user count to post to the service
     * @param [counts.voiceConnections] - The voice connection count to post to the service
     * @returns The result(s) of the post
     */
    postManual(service: Service | "all", counts: {
        serverCount: number;
        userCount?: number;
        voiceConnections?: number;
    }): Promise<object | object[]>
    /**
     * Adds an handler for an event.
     * @param event - The name of the event to add the handler to
     * @param handler - The function that is run with the event
     * @returns The array of handlers currently set for that event
     */
    addHandler(event: CustomEvent, handler: eventHandler): eventHandler[]
    /**
     * Removes an handler for an event.
     * @param event - The name of the event to remove the handler from
     * @param handler - The function that is run with the event
     * @returns The array of handlers currently set for that event
     */
    removeHandler(event: CustomEvent, handler: eventHandler): eventHandler[]
    /**
     * Manually triggers an event with custom arguments.
     * @param event - The name of the event to run the handlers for
     * @param args - The arguments to pass to the handlers
     */
    runHandlers(event: CustomEvent, ...args: any[]): void
}

/**
 * Represents a basic service.
 * @param token - The token/key for the service
 */
export class ServiceBase {
    constructor(token: string);
    /**
     * The base URL of the service's API.
     */
    static readonly baseURL: string
    /**
     * Gets a service from a key.
     * @param key - The name of the service to get
     * @param [extras] - An array of {@link CustomService}s to include
     */
    static get(key: string, extras?: CustomService[]): ServiceBase
    /**
     * Gets every loaded service.
     */
    static getAll(): {
        [key: string]: ServiceBase;
    }
    /**
     * The values that can be used to select the service.
     */
    static readonly aliases: string[]
}

/**
 * Options for a poster.
 * @property [apiKeys] - An object that pairs a {@link Service} with their token
 * @property [client] - The client that a supported {@link Library} uses to manage the Discord application.
 * Requires {@link #clientLibrary} to be present
 * @property [clientID] - The client ID used for posting to a {@link Service}.
 * Automatically filled in when {@link #client} is present
 * @property [clientLibrary] - The library that the client is based on
 * @property [post] - The function to use when posting to a server that uses the client ID,
 * the amount of servers, and a {@link Shard}. This will be used when the {@link Service} is `custom`
 * @property [shard] - The shard data for using different methods of posting to services
 * @property [serverCount] - The function to use when retrieving the amount of servers a client/shard is in, using the client as a parameter
 * @property [userCount] - The function to use when retrieving the amount of users a client/shard is connected with, using the client as a parameter
 * @property [voiceConnections] - The function to use when retrieving the number of active voice connections, using the client as a parameter
 * @property [customServices] - The custom services that the poster will use
 * @property [useSharding = true] - Whether or not to use a {@link ServiceBase}s sharding method when posting
 */
export interface PosterOptions {
    apiKeys?: Record<Service, string>
    client?: any
    clientID?: string
    clientLibrary?: Library
    post?: PromiseResolvable
    shard?: Shard
    serverCount?: PromiseResolvable
    userCount?: PromiseResolvable
    voiceConnections?: PromiseResolvable
    customServices?: CustomService[]
    useSharding?: number
}

/**
 * A shard that is used when posting to services.
 * @property [count] - The amount of shards the client uses
 * @property [id] - The shard ID that is being used by the poster
 */
export interface Shard {
    count?: number
    id?: number
}

/**
 * The object that is given to {@link ServiceBase}s and {@link CustomService}s in order to send requests to them.
 * @param token - The Authorization token for the request
 * @param clientID - The client ID that the request will post for
 * @param serverCount - The amount of servers that the client is in
 * @param userCount - The amount of users that the client cached
 * @param voiceConnections - The amount of voice connections the client has
 * @param shard - The shard the request is representing
 */
export type PostRequestData = any

/**
 * An object with all query parameters
 */
export interface Query {
    [key: string]: string | number
}

/**
 * A mock of a {@link Service} that only consists of the nessessities for a poster to use it.
 * @property aliases - The keys that this service can get called from
 * @property post - The function that sends a request with the parameter being a {@link PostRequestData}.
 * Must return an axios Response object (use [`dbots.FormatRequest`](https://github.com/dbots-pkg/dbots.js/blob/master/src/Utils/FormatRequest.js#L14)).
 */
export interface CustomService {
    aliases: string[]
    post: (...params: any[]) => any
}

/**
 * A {@link ServiceBase} key supported by the package.
 * This can also includes keys from {@link CustomService}s and can be `custom` if a {@link Poster} has a custom post function.
 */
export type Service = string

/**
 * A library supported by the package. Here are the available libraries:
 * * discord.js
 * * discord.io
 * * discordie
 * * eris
 */
export type Library = string

/**
 * Type of function to set for handlers
 * @param result - The result(s) of the post
 */
export type eventHandler = (result: object | object[]) => void

/**
 * An event that can be added an handler for. These are the available events:
 * * autopost
 * * autopostfail
 * * post
 * * postfail
 */
export type CustomEvent = string

/**
 * Extend an error of some sort into a DBotsError.
 * @param Base - Base error to extend
 * @returns The resulting class (as a class, not an instance)
 */
export function makeDbotsError(Base: typeof Error): typeof DBotsError

/**
 * Format the message for an error.
 * @param key - Error key
 * @param args - Arguments to pass for util format or as function args
 * @returns Formatted string
 */
export function message(key: string, args: any[]): string

/**
 * Register an error code and message.
 * @param sym - Unique name for the error
 * @param val - Value of the error
 */
export function register(sym: string, val: any): void

export type stringCallback = () => string

/**
 * Data that can be resolved to give a string. This can either be a Function or a Promise.
 */
export type PromiseResolvable = stringCallback | eventHandler | Promise<string>

export interface AxiosResponse {
    [key: string]: any
}

/**
 * Returns a request.
 * @param options - An object containing the config for the request: only basic properties are documented, but all [Axios](https://github.com/axios/axios#request-config) parameters are valid
 * @returns The request
 */
export function FormatRequest(options: RequestForm): Promise<AxiosResponse>

export class Util {
    /**
     * Resolves data into a Discord ID.
     * @param data - The data to resolve
     */
    static resolveID(data: IDResolvable): void
    /**
     * Resolves data into a countable number that is finite and positive.
     * @param data - The data to resolve
     */
    static resolveCount(data: CountResolvable): void
}

/**
 * Data that can be resolved to give a Discord ID, this can be:
 * * A string
 * * A number
 * * Any value with an `id` key
 */
export type IDResolvable = string | number | Record<"id", string>

/**
 * Data that can be resolved to give a finite and positive integer.
 * This can include any value that can be parsed into an integer.
 */
export type CountResolvable = any
