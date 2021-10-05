import { Service, ServicePostOptions } from '../Service'
import { Util, IDResolvable } from '../../Utils/Util'

/**
 * Represents the BladeBotList service.
 * @see https://docs.bladebotlist.xyz/api/introduction.html
 */
export default class BladeBotList extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['bladebotlist', 'bladebotlist.xyz']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://bladebotlist.xyz/img/logo.svg'
  }

  /** Service's name. */
  static get serviceName() {
    return 'BladeBotList'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://bladebotlist.xyz'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://bladebotlist.xyz/api/'
  }

  /**
   * Posts statistics to this service.
   * @param options The options of the request.
   */
  static post(options: ServicePostOptions) {
    const { token, clientID, serverCount, shard } = options
    return super._post({
      method: 'post',
      url: `/bots/${Util.resolveID(clientID)}/stats/`,
      headers: { Authorization: token },
      data: shard
        ? {
            server_count: Util.resolveCount(serverCount),
            shard_count: shard.count
          }
        : { server_count: Util.resolveCount(serverCount) }
    })
  }

  /**
   * Gets the bot listed on this service.
   * @param id The bot's ID.
   */
  getBot(id: IDResolvable) {
    return this._request({ url: `/bots/${Util.resolveID(id)}` })
  }

  /**
   * Checks whether a user has given a vote to the bot.
   * @param botID The bot's ID.
   * @param userID The user's ID.
   */
  userVoted(botID: IDResolvable, userID: IDResolvable) {
    return this._request({
      url: `/bots/${Util.resolveID(botID)}/votes/${Util.resolveID(userID)}`
    })
  }
}
