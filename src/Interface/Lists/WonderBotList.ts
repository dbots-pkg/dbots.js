import { Service, ServicePostOptions } from '../Service'
import { Util, IDResolvable } from '../../Utils/Util'

/**
 * Represents the Wonder Bot List service.
 * @see https://api.wonderbotlist.com/en/
 */
export default class WonderBotList extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return [
      'wonderbotlist',
      'wonderbotlist.com',
      'wonderbotlistcom',
      'wonder',
      'wbl'
    ]
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://get.snaz.in/8Jk3EJg.png'
  }

  /** Service's name. */
  static get serviceName() {
    return 'Wonder Bot List'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://wonderbotlist.com/en'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://api.wonderbotlist.com/v1'
  }

  /**
   * Posts statistics to this service.
   * @param options The options of the request
   */
  static post(options: ServicePostOptions) {
    const { token, clientID, serverCount, shard } = options
    return super._post({
      method: 'post',
      url: `/bot/${Util.resolveID(clientID)}`,
      headers: { Authorization: token },
      params:
        shard && shard.count
          ? { serveurs: Util.resolveCount(serverCount), shard: shard.count }
          : { serveurs: Util.resolveCount(serverCount) }
    })
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
   * @param id The user's ID
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
