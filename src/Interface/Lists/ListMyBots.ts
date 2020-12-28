import { Service, ServicePostOptions } from '../Service'
import { Util, IDResolvable } from '../../Utils/Util'
import { Query } from '../../Utils/Constants'

/**
 * Represents the List My Bots service.
 * @see https://listmybots.com/docs/api
 */
export default class ListMyBots extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['listmybots', 'listmybots.com', 'listmybotscom', 'lmb']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://get.snaz.in/5Vm5J7i.png'
  }

  /** Service's name. */
  static get serviceName() {
    return 'List My Bots'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://listmybots.com/'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://listmybots.com/api'
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
      url: `/bot/${Util.resolveID(clientID)}`,
      headers: { Authorization: token },
      data: { count: Util.resolveCount(serverCount) }
    })
  }

  /**
   * Gets the bot listed on this service.
   * @param id The bot's ID
   */
  getBot(id: IDResolvable) {
    return this._request({ url: `/bot/${Util.resolveID(id)}` })
  }

  /**
   * Gets the status widget URL for this bot.
   * @param id The bot's ID
   * @param query The query string that will be used in the request
   */
  getStatusWidgetURL(id: IDResolvable, query?: Query) {
    return this._appendQuery(
      `https://listmybots.com/api/bot/${Util.resolveID(id)}/widget/status`,
      query || {},
      false
    )
  }

  /**
   * Gets the user listed on this service.
   * @param id The user's ID
   */
  getUser(id: IDResolvable) {
    return this._request({ url: `/user/${Util.resolveID(id)}` })
  }

  /**
   * Gets the info about someone's bots.
   * @param id The user's ID
   */
  getUserBots(id: IDResolvable) {
    return this._request({ url: `/bots/${Util.resolveID(id)}` })
  }

  /**
   * Gets the widget URL for this bot.
   * @param id The bot's ID
   * @param query The query string that will be used in the request
   */
  getWidgetURL(id: IDResolvable, query?: Query) {
    return this._appendQuery(
      `https://listmybots.com/api/bot/${Util.resolveID(id)}/widget`,
      query || {},
      false
    )
  }
}
