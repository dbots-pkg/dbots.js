import { Service, ServicePostOptions } from '../Service'
import { IDResolvable, Util } from '../../Utils/Util'

/**
 * Represents the Infinity Bot List service.
 * @see https://spider.infinitybots.gg/docs
 */
export default class InfinityBotList extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return [
      'infinitybotlist',
      'infinitybotlist.com',
      'infinitybots',
      'infinitybots.gg'
    ]
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
    return 'https://infinitybots.gg/'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://spider.infinitybots.gg'
  }

  /**
   * Posts statistics to this service.
   * @param options The options of the request.
   */
  static post(options: ServicePostOptions) {
    const { clientID, token, serverCount, shard } = options
    return super._post({
      method: 'post',
      url: `/bots/stats`,
      headers: {
        authorization: token
      },
      data: {
        botid: clientID,
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
   * @param id The bot's ID.
   */
  getBot(id: IDResolvable) {
    return this._request({
      url: `/bots/${Util.resolveID(id)}`
    })
  }

  /** Gets a list of all bots on this service. */
  getBots() {
    return this._request({
      url: '/bots/@all'
    })
  }

  /**
   * Gets the user listed on this service.
   * @param id The user's ID.
   */
  getUser(id: IDResolvable) {
    return this._request({
      url: `/users/${Util.resolveID(id)}`
    })
  }
}
