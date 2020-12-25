import Service, { ServicePostOptions } from '../Service'
import Util, { IDResolvable } from '../../Utils/Util'
import { Query } from '../../Utils/Constants'

/**
 * Represents the Top.gg service.
 * @see https://top.gg/api/docs
 */
export default class TopGG extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['topgg', 'top.gg', 'top']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://top.gg/images/dblnew.png'
  }

  /** Service's name. */
  static get serviceName() {
    return 'Top.gg'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://top.gg'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://top.gg/api'
  }

  /**
   * Posts statistics to this service.
   * @param options The options of the request
   */
  static post(options: ServicePostOptions) {
    const { token, clientID, serverCount, shard } = options
    return super._post({
      method: 'post',
      url: `/bots/${Util.resolveID(clientID)}/stats`,
      headers: { Authorization: token },
      data: shard
        ? {
            server_count: Util.resolveCount(serverCount),
            shard_id: shard.id,
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
    return this._request({ url: `/users/${Util.resolveID(id)}` })
  }

  /**
   * Gets the list of bots on this service.
   * @param query The query string that will be used in the request
   */
  getBots(query: Query) {
    return this._request({ url: '/bots', params: query })
  }

  /**
   * Gets the bot listed on this service.
   * @param id The bot's ID
   */
  getBot(id: IDResolvable) {
    return this._request({ url: `/bots/${Util.resolveID(id)}` })
  }

  /**
   * Gets the bot's stats listed on this service.
   * @param id The bot's ID
   */
  getBotStats(id: IDResolvable) {
    return this._request({ url: `/bots/${Util.resolveID(id)}/stats` })
  }

  /**
   * Gets the list of people who voted this bot on this service.
   * @param id The bot's ID
   * @param query The query string that will be used in the request
   */
  getBotVotes(id: IDResolvable, query?: Query) {
    return this._request({
      url: `/bots/${Util.resolveID(id)}/votes`,
      params: query
    })
  }

  /**
   * Checks whether or not a user has voted for a bot on this service.
   * @param id The bot's ID
   * @param userID The user's ID
   */
  userVoted(id: IDResolvable, userID: IDResolvable) {
    return this._request({
      url: `/bots/${Util.resolveID(id)}/check`,
      params: { userId: Util.resolveID(userID) }
    })
  }

  /**
   * Gets the widget URL for this bot.
   * @param id The bot's ID
   * @param query The query string that will be used in the request
   * @param smallWidget The sub-path name to turn the widget into a badge (i.e. owner)
   */
  getWidgetURL(id: IDResolvable, query?: Query, smallWidget?: string) {
    const subPath = smallWidget ? `${smallWidget}/` : ''
    return this._appendQuery(
      `/widget/${subPath}${Util.resolveID(id)}.svg`,
      query || {}
    )
  }
}
