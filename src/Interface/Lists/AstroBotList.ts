import { Service, ServicePostOptions } from '../Service'
import { Util } from '../../Utils/Util'

/**
 * Represents the Astro Bot List service.
 * @see https://botlists.com/api/docs
 */
export default class AstroBotList extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['astrobotlist', 'botlists.com']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://cdn.bot-list.xyz/7364djcas.png'
  }

  /** Service's name. */
  static get serviceName() {
    return 'Astro Bot List'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://botlists.com'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://botlists.com/api'
  }

  /**
   * Posts statistics to this service.
   * @param options The options of the request
   */
  static post(options: ServicePostOptions) {
    const { token, serverCount } = options
    return super._post({
      method: 'post',
      url: '/bot',
      headers: { token },
      data: {
        guild_count: Util.resolveCount(serverCount)
      }
    })
  }

  /** Gets the stats of this bot. */
  getOwnStats() {
    return this._request(
      {
        url: '/bot',
        headers: { token: this.token }
      },
      {
        requiresToken: true
      }
    )
  }
}
