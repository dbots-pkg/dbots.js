import { Service, ServicePostOptions } from '../Service'
import { Util, IDResolvable } from '../../Utils/Util'

/**
 * Represents the Discord Bot World service.
 * @see https://discordbot.world/docs
 */
export default class DiscordBotWorld extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['discordbotworld', 'discordbot.world', 'dbotworld', 'dbw']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://i.olsh.me/icon?size=1..100..500&url=discordbot.world'
  }

  /** Service's name. */
  static get serviceName() {
    return 'Discord Bot World'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://discordbot.world'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://discordbot.world/api'
  }

  /**
   * Posts statistics to this service.
   * <warn>Shard data posting is not supported for this service.</warn>
   * @param options The options of the request
   */
  static post(options: ServicePostOptions) {
    const { token, clientID, serverCount } = options
    return super._post({
      method: 'post',
      url: `/bot/${Util.resolveID(clientID)}/stats`,
      headers: { Authorization: token },
      data: { guild_count: serverCount }
    })
  }

  /** Gets a list of bots on this service. */
  getBots() {
    return this._request({ url: '/bots' })
  }

  /**
   * Gets the bot listed on this service.
   * @param id The bot's ID
   */
  getBot(id: IDResolvable) {
    return this._request({ url: `/bots/${Util.resolveID(id)}/info` })
  }

  /**
   * Gets the bot's stats on this service.
   * @param id The bot's ID
   */
  getBotStats(id: IDResolvable) {
    return this._request({ url: `/bots/${Util.resolveID(id)}/stats` })
  }

  /**
   * Gets the list of people who liked this bot on this service.
   * @param id The bot's ID
   */
  getBotLikes(id: IDResolvable) {
    return this._request(
      {
        url: `/bots/${Util.resolveID(id)}/likes`,
        headers: { Authorization: this.token }
      },
      {
        requiresToken: true
      }
    )
  }

  /**
   * Gets the user listed on this service.
   * @param id The user's ID
   */
  getUser(id: IDResolvable) {
    return this._request({ url: `/user/${Util.resolveID(id)}` })
  }
}
