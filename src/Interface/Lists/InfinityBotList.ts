import { Service, ServicePostOptions } from '../Service'
import { IDResolvable, Util } from '../../Utils/Util'

/**
 * Represents the Infinity Bot List service.
 * @see https://infinitybotlist.com/docs
 */
export default class InfinityBotList extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['infinitybotlist', 'infinitybotlist.com']
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
    return 'https://infinitybotlist.com'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://infinitybotlist.com/api'
  }

  /**
   * Posts statistics to this service.
   * @param options The options of the request
   */
  static post(options: ServicePostOptions) {
    const { clientID, token, serverCount, shard } = options
    return super._post({
      method: 'post',
      url: `/bots/${Util.resolveID(clientID)}`,
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
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
      url: `/bots/${Util.resolveID(id)}/info`,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  /**
   * Gets the user listed on this service.
   * @param id The user's ID
   */
  getUser(id: IDResolvable) {
    return this._request({
      url: `/users/${Util.resolveID(id)}`,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
