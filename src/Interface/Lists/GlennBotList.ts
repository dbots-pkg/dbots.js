import ServiceBase, { ServiceBasePostOptions } from '../ServiceBase'
import Util, { IDResolvable } from '../../Utils/Util'
import { Query } from '../../Utils/Constants'

/**
 * Represents the Glenn Bot List service.
 * @see https://docs.glennbotlist.xyz/
 * @extends {ServiceBase}
 *
 * @constructor
 * @param {string} token The token/key for the service
 */
export default class GlennBotList extends ServiceBase {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['glennbotlist', 'glennbotlist.xyz', 'glennbotlist.gg', 'glenn']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://get.snaz.in/8HphUE7.jpg'
  }

  /** Service's name. */
  static get serviceName() {
    return 'Glenn Bot List'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://glennbotlist.xyz'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://glennbotlist.xyz/api'
  }

  /**
   * Posts statistics to this service.
   * @param options The options of the request
   */
  static post(options: ServiceBasePostOptions) {
    const { token, clientID, serverCount, shard } = options
    return super._post({
      method: 'post',
      url: `/bot/${Util.resolveID(clientID)}/stats`,
      headers: { Authorization: token },
      data: {
        serverCount: Util.resolveCount(serverCount),
        shardCount: shard ? Util.resolveCount(shard.count) : undefined
      }
    })
  }

  /**
   * Gets the bot listed on this service.
   * @param id The bot's ID
   */
  getBot(id: IDResolvable) {
    return this._request({ url: `/bot/${Util.resolveID(id)}` })
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
   * Get a user's profile listed on this service.
   * @param id The user's ID
   */
  getUser(id: IDResolvable) {
    return this._request({ url: `/user/${Util.resolveID(id)}` })
  }

  /**
   * Gets the widget URL for this bot.
   * @param id The bot's ID
   * @param query The query string that will be used in the request
   */
  getWidgetURL(id: IDResolvable, query?: Query) {
    return this._appendQuery(
      `https://glennbotlist.xyz/bot/${Util.resolveID(id)}/widget`,
      query || {},
      false
    )
  }
}
