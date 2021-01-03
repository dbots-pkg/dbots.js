import { Service, ServicePostOptions } from '../Service'
import { Util, CountResolvable, IDResolvable } from '../../Utils/Util'
import { Query } from '../../Utils/Constants'

/**
 * Represents the botlist.space service.
 * @see https://docs.botlist.space/
 */
export default class BotListSpace extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['botlistspace', 'botlist.space', 'bls']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://i.olsh.me/icon?size=1..100..500&url=botlist.space'
  }

  /** Service's name. */
  static get serviceName() {
    return 'botlist.space'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://botlist.space'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://api.botlist.space/v1'
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
      url: `/bots/${Util.resolveID(clientID)}`,
      headers: { Authorization: token },
      data: { server_count: Util.resolveCount(serverCount) }
    })
  }

  /** Gets the statistics of this service. */
  getStatistics() {
    return this._request({ url: '/statistics' })
  }

  /** Gets a list of bots on this service. */
  getBots() {
    return this._request({ url: '/bots' })
  }

  /** Gets the bot listed on this service. */
  getBot(id: IDResolvable) {
    return this._request({ url: `/bots/${Util.resolveID(id)}` })
  }

  /**
   * Gets the list of people who voted this bot on this service.
   * @param id The bot's ID
   */
  getBotVotes(id: IDResolvable) {
    return this._request(
      {
        url: `/bots/${Util.resolveID(id)}/upvotes`,
        headers: { Authorization: this.token }
      },
      {
        requiresToken: true
      }
    )
  }

  /**
   * Gets the uptime of a bot listed on this service.
   * @param id The bot's ID
   */
  getBotUptime(id: IDResolvable) {
    return this._request({ url: `/bots/${Util.resolveID(id)}/uptime` })
  }

  /**
   * Gets the user listed on this service.
   * @param id The user's ID
   */
  getUser(id: IDResolvable) {
    return this._request({ url: `/users/${Util.resolveID(id)}` })
  }

  /**
   * Gets the user's bots listed for this service.
   * @param id The user's ID
   */
  getUserBots(id: IDResolvable) {
    return this._request({ url: `/users/${Util.resolveID(id)}/bots` })
  }

  /**
   * Gets the widget URL for this bot.
   * @param id The bot's ID
   * @param style The style of the widget, cannot be zero
   * @param query The query string that will be used in the request
   */
  getWidgetURL(
    id: IDResolvable,
    style: CountResolvable = 1,
    query: Query = {}
  ) {
    return this._appendQuery(
      `https://api.botlist.space/widget/${Util.resolveID(
        id
      )}/${Util.resolveCount(style)}`,
      query,
      false
    )
  }
}
