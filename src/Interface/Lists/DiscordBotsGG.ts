import { Service, ServicePostOptions } from '../Service'
import { Util, IDResolvable } from '../../Utils/Util'
import { Package, Query } from '../../Utils/Constants'

/** The user agent used options for the DiscordBotsGG service */
export interface DiscordBotsGGUserAgent {
  /** The bot's library */
  library: string

  /** The bot ID for the user agent */
  clientID: string
}

/**
 * Represents the Discord Bots service.
 * @see https://discord.bots.gg/docs
 */
export default class DiscordBotsGG extends Service {
  /** The user agent options for this service */
  private agent: DiscordBotsGGUserAgent

  //
  /**
   * @param token The token/key for the service
   * @param userAgent The user agent options of the service. Providing this is highly recommended.
   */
  constructor(token: string, userAgent?: DiscordBotsGGUserAgent) {
    super(token)
    this.agent = {
      library: userAgent?.library || 'unknown',
      clientID: userAgent?.clientID || '000000000000000'
    }
  }

  /** The values that can be used to select the service. */
  static get aliases() {
    return ['discordbotsgg', 'discord.bots.gg']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://discord.bots.gg/favicon.png'
  }

  /** Service's name. */
  static get serviceName() {
    return 'Discord Bots'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://discord.bots.gg'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://discord.bots.gg/api/v1'
  }

  /**
   * Creates a compliant user agent to use for any API calls to Discord Bots.
   * @param botID The ID of the bot that the agent will be identified with
   * @param library The library the agent is using
   */
  static userAgent(botID: IDResolvable, library = 'unknown') {
    return `dbots-0000/${
      Package.version
    } (${library}; +https://github.com/dbots-pkg/dbots.js) DBots/${Util.resolveID(
      botID
    )}`
  }

  /**
   * Posts statistics to this service.
   * @param options The options of the request
   */
  static post(options: ServicePostOptions) {
    const { token, clientID, serverCount, shard } = options
    return super._post({
      method: 'post',
      url: `/bots/${Util.resolveID(clientID)}/stats`,
      headers: {
        Authorization: token,
        'User-Agent': DiscordBotsGG.userAgent(clientID)
      },
      data: shard
        ? {
            guildCount: Util.resolveCount(serverCount),
            shardId: shard.id,
            shardCount: shard.count
          }
        : { guildCount: Util.resolveCount(serverCount) }
    })
  }

  /**
   * Gets the bot listed on this service.
   * @param id The bot's ID
   * @param sanitized Whether to sanitize descriptions
   */
  getBot(id: IDResolvable, sanitized = false) {
    return this._request(
      {
        url: `/bots/${Util.resolveID(id)}`,
        headers: {
          Authorization: this.token,
          'User-Agent': DiscordBotsGG.userAgent(
            this.agent.clientID,
            this.agent.library
          )
        },
        params: { sanitized }
      },
      {
        requiresToken: true
      }
    )
  }

  /**
   * Gets a list of bots on this service.
   * @param query The query string that will be used in the request
   */
  getBots(query?: Query) {
    return this._request(
      {
        url: '/bots',
        headers: {
          Authorization: this.token,
          'User-Agent': DiscordBotsGG.userAgent(
            this.agent.clientID,
            this.agent.library
          )
        },
        params: query
      },
      {
        requiresToken: true
      }
    )
  }
}
