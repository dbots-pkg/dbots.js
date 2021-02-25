import { Service, ServicePostOptions } from '../Service'
import { Util, IDResolvable } from '../../Utils/Util'
import { Query } from '../../Utils/Constants'

/**
 * Represents the Blist service.
 * @see https://blist.xyz/docs/
 */
export default class Blist extends Service {
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
    return 'https://blist.xyz/api/v2'
  }

  /**
   * Posts statistics to this service.
   * @param options The options of the request
   */
  static post(options: ServicePostOptions) {
    const { token, clientID, serverCount, shard } = options
    return super._post({
      method: 'patch',
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
   * Gets the user's bots listed on this service.
   * @param id The user's ID
   */
  getUserBots(id: IDResolvable) {
    return this._request({ url: `/user/${Util.resolveID(id)}/bots` })
  }

  /**
   * Gets the user's servers listed on this service.
   * @param id The user's ID
   */
  getUserServers(id: IDResolvable) {
    return this._request({ url: `/user/${Util.resolveID(id)}/servers` })
  }

  /**
   * Gets the server listed on this service.
   * @param id The server's ID
   */
  getServer(id: IDResolvable) {
    return this._request({ url: `/server/${Util.resolveID(id)}` })
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
   * Gets the bot's reviews on this service.
   * @param id The bot's ID
   */
  getBotReviews(id: IDResolvable) {
    return this._request({ url: `/bot/${Util.resolveID(id)}/reviews` })
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
