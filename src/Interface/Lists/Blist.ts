import ServiceBase, { ServiceBasePostOptions } from '../ServiceBase'
import Util, { IDResolvable } from '../../Utils/Util'
import { Query } from '../../Utils/Constants'

/**
 * Represents the Blist service.
 * @see https://blist.xyz/docs/
 */
export default class Blist extends ServiceBase {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['blist', 'blist.xyz']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://blist.xyz/main_site/staticfiles/main/assets/blist.png'
  }

  /** Service's name. */
  static get serviceName() {
    return 'Blist'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://blist.xyz'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://blist.xyz/api'
  }

  /**
   * Posts statistics to this service.
   * @param {Object} options The options of the request
   */
  static post(options: ServiceBasePostOptions) {
    const { token, clientID, serverCount, shard } = options
    return super._post({
      method: 'post',
      url: `/bot/${Util.resolveID(clientID)}/stats/`,
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
   * Gets the user listed on this service.
   * @param id The user's ID
   */
  getUser(id: IDResolvable) {
    return this._request({ url: `/user/${Util.resolveID(id)}` })
  }

  /**
   * Gets the bot listed on this service.
   * @param id The bot's ID
   */
  getBot(id: IDResolvable) {
    return this._request({ url: `/bot/${Util.resolveID(id)}/stats` })
  }

  /**
   * Gets the list of people who voted this bot on this service.
   * @param id The bot's ID
   */
  getBotVotes(id: IDResolvable) {
    return this._request(
      {
        url: `/bot/${Util.resolveID(id)}/votes`,
        headers: { Authorization: this.token }
      },
      {
        requiresToken: true
      }
    )
  }

  /**
   * Gets the widget URL for this bot.
   * @param id The bot's ID
   * @param query The query string that will be used in the request
   */
  getWidgetURL(id: IDResolvable, query: Query) {
    const actualQuery = Object.assign({ type: 'normal' }, query)
    return this._appendQuery(`/bot/${Util.resolveID(id)}/widget`, actualQuery)
  }
}
