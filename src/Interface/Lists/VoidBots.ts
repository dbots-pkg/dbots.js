import { Service, ServicePostOptions } from '../Service'
import { Util, IDResolvable } from '../../Utils/Util'

/**
 * Represents the Void Bots service.
 * @see https://docs.voidbots.net/
 */
export default class VoidBots extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['voidbots', 'void', 'voidbots.net']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://gblobscdn.gitbook.com/spaces%2F-MFw3t62urLlBeats8UJ%2Favatar-1598748054479.png'
  }

  /** Service's name. */
  static get serviceName() {
    return 'Void Bots'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://voidbots.net/'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://voidbots.net/api'
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
      url: `/auth/stats/${Util.resolveID(clientID)}`,
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      data: { server_count: Util.resolveCount(serverCount) }
    })
  }

  /**
   * Gets the bot listed on this service.
   * @param id The bot's ID
   */
  getBot(id: IDResolvable) {
    return this._request({ url: `/auth/info/${Util.resolveID(id)}` })
  }

  /**
   * Gets the user listed on this service.
   * @param id The user's ID
   */
  getUser(id: IDResolvable) {
    return this._request({ url: `/user/info/${Util.resolveID(id)}` })
  }

  /**
   * Checks whether or not a user has voted for a bot on this service.
   * @param botId The bot's ID
   * @param userID The user's ID
   */
  userVoted(botId: IDResolvable, userID: IDResolvable) {
    return this._request({
      url: `/auth/voted/${Util.resolveID(botId)}`,
      headers: { voter: Util.resolveID(userID) }
    })
  }

  /**
   * Gets the bot's reviews on this service.
   * @param id The bot's ID
   */
  getBotReviews(id: IDResolvable) {
    return this._request(
      {
        url: `/auth/reviews/${Util.resolveID(id)}`,
        headers: { Authorization: this.token }
      },
      { requiresToken: true }
    )
  }

  /**
   * Gets the bot's analytics on this service.
   * @param id The bot's ID
   */
  getBotAnalytics(id: IDResolvable) {
    return this._request(
      {
        url: `/auth/analytics/${Util.resolveID(id)}`,
        headers: { Authorization: this.token }
      },
      { requiresToken: true }
    )
  }
}
