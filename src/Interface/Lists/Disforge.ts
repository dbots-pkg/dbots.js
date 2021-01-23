import { Service, ServicePostOptions } from '../Service'
import { Util } from '../../Utils/Util'

/**
 * Represents the Disforge service.
 * @see https://disforge.com/developer
 */
export default class Disforge extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['disforge', 'disforge.com']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://disforge.com/assets/img/ui/categories/all-bots.png'
  }

  /** Service's name. */
  static get serviceName() {
    return 'Disforge'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://disforge.com/bots'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://disforge.com/api'
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
      url: `/botstats/${Util.resolveID(clientID)}`,
      headers: {
        Authorization: token
      },
      data: {
        servers: Util.resolveCount(serverCount)
      }
    })
  }

  /**
   * Retreives the data shown on the homepage.
   */
  getHomepage() {
    return this._request({ url: `/home` })
  }

  /**
   * Retreives statistics about Disforge.
   */
  getStats() {
    return this._request({ url: `/stats` })
  }
}
