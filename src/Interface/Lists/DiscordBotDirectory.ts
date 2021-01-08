import { Service, ServicePostOptions } from '../Service'
import { Util, IDResolvable } from '../../Utils/Util'

/**
 * Represents the Discord Bot Directory service.
 * @see https://botblock.org/lists/discordbotdirectory.net
 */
export default class DiscordBotDirectory extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['discordbotdirectory', 'dbd', 'discordbotdirectory.net']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://discordbotdirectory.net/assets/img/logo.png'
  }

  /** Service's name. */
  static get serviceName() {
    return 'Discord Bot Directory'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://discordbotdirectory.net'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://discordbotdirectory.net/api'
  }

  /**
   * Posts statistics to this service.
   * <warn>The docs for this endopoint exist only in a Discord message</warn>
   * <warn>Shard data posting is not supported for this service.</warn>
   * @param options The options of the request
   */
  static post(options: ServicePostOptions) {
    const { token, clientID, serverCount } = options
    return super._post({
      method: 'post',
      url: `/auth/stats/${Util.resolveID(clientID)}`,
      headers: { authorization: token, 'Content-Type': 'application/json' },
      data: { server_count: Util.resolveCount(serverCount) }
    })
  }

  /**
   * Gets the widget URL for this bot.
   * @param id The bot's ID
   */
  getWidgetURL(id: IDResolvable) {
    return this._appendQuery(`/embed/${Util.resolveID(id)}`, {})
  }
}
