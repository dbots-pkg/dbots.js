import { Service, ServicePostOptions } from '../Service'
import { Util } from '../../Utils/Util'

/**
 * Represents the dlist.gg service.
 * @see https://api.discordlist.gg/developers/
 */
export default class DList extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['dlistgg', 'dlist.gg', 'discordlistgg', 'discordlist.gg']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://avatars.githubusercontent.com/u/68995595'
  }

  /** Service's name. */
  static get serviceName() {
    return 'dlist.gg'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://discordlist.gg'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://api.discordlist.gg/v0'
  }

  /**
   * Posts statistics to this service.
   * <warn>Shard data posting is not supported for this service.</warn>
   * @param options The options of the request.
   */
  static post(options: ServicePostOptions) {
    const { token, clientID, serverCount } = options
    return super._post({
      method: 'post',
      url: `/bots/${Util.resolveID(clientID)}/guilds`,
      headers: { Authorization: `Bearer ${token}` },
      params: {
        count: Util.resolveCount(serverCount)
      }
    })
  }
}
