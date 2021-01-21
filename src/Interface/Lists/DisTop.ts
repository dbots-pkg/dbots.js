import { Service, ServicePostOptions } from '../Service'
import { Util } from '../../Utils/Util'

/**
 * Represents the DisTop service.
 * @see https://docs.distop.xyz/
 */
export default class DisTop extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['distop', 'distop.xyz']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://gblobscdn.gitbook.com/spaces%2F-MNddxbtCjE7i-9BWYMZ%2Favatar-1607019591745.png'
  }

  /** Service's name. */
  static get serviceName() {
    return 'DisTop'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://bots.distop.xyz/'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://distop.xyz/api/'
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
      url: `/update/${Util.resolveID(clientID)}/`,
      data: {
        guild_count: Util.resolveCount(serverCount),
        token
      }
    })
  }
}
