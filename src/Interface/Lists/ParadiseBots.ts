import { Service, ServicePostOptions } from '../Service'
import { IDResolvable, Util } from '../../Utils/Util'

/**
 * Represents the Paradise Bots service.
 * @see https://paradisebots.net/api/v1/docs
 */
export default class ParadiseBots extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['paradise', 'paradisebots', 'paradisebots.net', 'pb']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://i.imgur.com/Df2seyl.png'
  }

  /** Service's name. */
  static get serviceName() {
    return 'Paradise Bots'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://paradisebots.net/'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://paradisebots.net/api/v1'
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
      headers: {
        Authorization: token
      },
      data: {
        server_count: Util.resolveCount(serverCount),
        ...(shard?.count
          ? {
              shard_count: Util.resolveCount(shard.count)
            }
          : {})
      }
    })
  }

  /**
   * Gets the bot listed on this service.
   * @param id The bot's ID
   */
  getBot(id: IDResolvable) {
    return this._request({ url: `/bots/${Util.resolveID(id)}` })
  }
}
