import { Service, ServicePostOptions } from '../Service'
import { Util, IDResolvable } from '../../Utils/Util'
import { Query } from '../../Utils/Constants'

/**
 * Represents the Bots On Discord service.
 * @see https://bots.ondiscord.xyz/info/api
 */
export default class BotsOnDiscord extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['botsondiscord', 'bots.ondiscord.xyz']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://i.olsh.me/icon?size=1..100..500&url=bots.ondiscord.xyz'
  }

  /** Service's name. */
  static get serviceName() {
    return 'Bots On Discord'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://bots.ondiscord.xyz'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://bots.ondiscord.xyz/bot-api'
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
      url: `/bots/${Util.resolveID(clientID)}/guilds`,
      headers: { Authorization: token },
      data: { guildCount: Util.resolveCount(serverCount) }
    })
  }

  /**
   * Checks whether or not a user has reviewed a bot.
   * @param id The bot's ID
   * @param userId The user's ID
   */
  checkReview(id: IDResolvable, userId: IDResolvable) {
    return this._request(
      {
        url: `/bots/${Util.resolveID(id)}/review`,
        headers: { Authorization: this.token },
        params: { owner: Util.resolveID(userId) }
      },
      {
        requiresToken: true
      }
    )
  }

  /**
   * Gets the widget URL for this bot.
   * @param id The bot's ID
   * @param query The query string that will be used in the request
   */
  getWidgetURL(id: IDResolvable, query?: Query) {
    return this._appendQuery(
      `https://bots.ondiscord.xyz/bots/${Util.resolveID(id)}/embed`,
      query || {},
      false
    )
  }
}
