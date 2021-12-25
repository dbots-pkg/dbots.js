import { Service, ServicePostOptions } from '../Service'
import { IDResolvable, Util } from '../../Utils/Util'

/**
 * Represents the Infinity Bot List service.
 * @see https://api.infinitybotlist.com/docs
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
    return 'https://infinitybotlist.com/'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://api.infinitybotlist.com'
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
      url: '/bots/all'
    })
  }

  /**
   * Gets the user listed on this service.
   * @param id The user's ID.
   */
  getUser(id: IDResolvable) {
    return this._request({
      url: `/user/${Util.resolveID(id)}`
    })
  }

  /**
   * Check's whether a user is part of the staff.
   * @param id The user's ID.
   */
  checkStaff(id: IDResolvable) {
    return this._request({
      url: `staff/check/${Util.resolveID(id)}`
    })
  }

  /**
   * Checks whether a user has voted for the bot.
   * @param botId The bot's ID.
   * @param userId The user's ID.
   */
  userVoted(botId: IDResolvable, userId: IDResolvable) {
    return this._request({
      url: `/votes/${Util.resolveID(botId)}/${Util.resolveID(userId)}`
    })
  }
}
