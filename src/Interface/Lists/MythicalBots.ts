import { Service, ServicePostOptions } from '../Service'
import { Util, IDResolvable } from '../../Utils/Util'
import { Query } from '../../Utils/Constants'

/**
 * Represents the Mythical Bots service.
 * @see https://docs.mythicalbots.xyz/
 */
export default class MythicalBots extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['mythicalbots', 'mythicalbots.xyz']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://get.snaz.in/2PGqLVM.png'
  }

  /** Service's name. */
  static get serviceName() {
    return 'Mythical Bots'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://mythicalbots.xyz/'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://mythicalbots.xyz/api'
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
      data: { server_count: Util.resolveCount(serverCount) }
    })
  }

  /**
   * Gets the bot listed on this service.
   * @param id The bot's ID
   */
  getBot(id: IDResolvable) {
    return this._request({ url: `/bot/${Util.resolveID(id)}/info` })
  }

  /**
   * Gets the user listed on this service.
   * @param id The user's ID
   */
  getUser(id: IDResolvable) {
    return this._request({ url: `/user/${Util.resolveID(id)}/info` })
  }

  /**
   * Gets the widget URL for this bot.
   * @param id The bot's ID
   * @param query The query string that will be used in the request
   */
  getWidgetURL(id: IDResolvable, query?: Query) {
    return this._appendQuery(
      `https://mythicalbots.xyz/bot/${Util.resolveID(id)}/embed`,
      query || {},
      false
    )
  }
}
