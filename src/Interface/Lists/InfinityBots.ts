import { Service, ServicePostOptions } from '../Service'
import { IDResolvable, Util } from '../../Utils/Util'

/**
 * Represents the Infinity Bots service.
 * @see https://docs.infinitybots.xyz
 */
export default class InfinityBots extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['infinitybots', 'infinitybots.xyz']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://i.imgur.com/x0LCfAh.png'
  }

  /** Service's name. */
  static get serviceName() {
    return 'Infinity Bot List'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://infinitybots.xyz'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://api.infinitybots.xyz'
  }

  /**
   * Posts statistics to this service.
   * @param options The options of the request
   */
  static post(options: ServicePostOptions) {
    const { clientID, token, serverCount, shard } = options
    return super._post({
      method: 'post',
      url: `/bot/${Util.resolveID(clientID)}`,
      headers: {
        authorization: token
      },
      data: {
        servers: Util.resolveCount(serverCount),
        ...(shard?.count
          ? {
              shards: Util.resolveCount(shard.count)
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
    return this._request({
      url: `/bot/${Util.resolveID(id)}/info`
    })
  }

  /**
   * Gets the user listed on this service.
   * @param id The user's ID
   */
  getUser(id: IDResolvable) {
    return this._request({
      url: `/user/${Util.resolveID(id)}`
    })
  }
}
