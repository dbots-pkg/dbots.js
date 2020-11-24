import ServiceBase, { ServiceBasePostOptions } from '../ServiceBase'
import Util, { IDResolvable } from '../../Utils/Util'

/**
 * Represents the Discord Extreme List service.
 * @see https://docs.discordextremelist.xyz/
 */
export default class DiscordExtremeList extends ServiceBase {
  static get aliases() {
    return [
      'discordextremelist',
      'discordextremelist.xyz',
      'discordextremelistxyz',
      'del'
    ]
  }

  static get logoURL() {
    return 'https://get.snaz.in/4KjWg91.png'
  }

  static get serviceName() {
    return 'Discord Extreme List'
  }

  static get websiteURL() {
    return 'https://discordextremelist.xyz/'
  }

  static get baseURL() {
    return 'https://api.discordextremelist.xyz/v2'
  }

  /**
   * Posts statistics to this service.
   * @param options The options of the request
   */
  static post(options: ServiceBasePostOptions) {
    const { token, clientID, serverCount, shard } = options
    return super._post({
      method: 'post',
      url: `/bot/${Util.resolveID(clientID)}/stats`,
      headers: { Authorization: token },
      data: {
        guildCount: Util.resolveCount(serverCount),
        shardCount: shard ? Util.resolveCount(shard.count) : undefined
      }
    })
  }

  /** Gets the statistics of this service. */
  getStatistics() {
    return this._request(
      {
        url: '/stats',
        headers: { Authorization: this.token }
      },
      {
        requiresToken: true
      }
    )
  }

  /**
   * Gets the bot listed on this service.
   * @param id The bot's ID
   */
  getBot(id: IDResolvable) {
    return this._request(
      {
        url: `/bot/${Util.resolveID(id)}`,
        headers: { Authorization: this.token }
      },
      {
        requiresToken: true
      }
    )
  }

  /**
   * Gets the user listed on this service.
   * @param id The bot's ID
   */
  getUser(id: IDResolvable) {
    return this._request(
      {
        url: `/user/${Util.resolveID(id)}`,
        headers: { Authorization: this.token }
      },
      {
        requiresToken: true
      }
    )
  }
}
