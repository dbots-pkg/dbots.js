import { Service, ServicePostOptions } from '../Service'
import { Util, AnyObject, IDResolvable } from '../../Utils/Util'

/**
 * Represents the Discord Apps service.
 * @see https://discordapps.dev/en-GB/posts/docs/api-v2/
 */
export default class DiscordAppsDev extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['discordappsdev', 'discordapps.dev', 'discordapps', 'dapps']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://api.discordapps.dev/img/logo/logo128.png'
  }

  /** Service's name. */
  static get serviceName() {
    return 'Discord Apps'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://discordapps.dev'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://api.discordapps.dev/api/v2'
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
      url: `/bots/${Util.resolveID(clientID)}`,
      headers: { Authorization: token },
      data: { bot: { count: Util.resolveCount(serverCount) } }
    })
  }

  /** Gets a list of bots on this service. */
  getBots() {
    return this._request({ url: '/bots' })
  }

  /** Gets a list of applications on this service. */
  getApps() {
    return this._request({ url: '/apps' })
  }

  /** Gets a list of RPC applications on this service. */
  getRPCApps() {
    return this._request({ url: '/rpc' })
  }

  /**
   * Gets the bot listed on this service.
   * @param id The bot's ID
   */
  getBot(id: IDResolvable) {
    return this._request({ url: `/bots/${Util.resolveID(id)}` })
  }

  /**
   * Updates the bot with the data provided.
   * @param id The bot's ID
   * @param data The data being posted
   */
  updateBot(id: IDResolvable, data: AnyObject) {
    return this._request(
      {
        method: 'post',
        url: `/bots/${Util.resolveID(id)}`,
        headers: { Authorization: this.token },
        data
      },
      {
        requiresToken: true
      }
    )
  }
}
