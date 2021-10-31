import { Service, ServicePostOptions } from '../Service'
import { Util, IDResolvable } from '../../Utils/Util'
import { Query } from '../../Utils/Constants'

/**
 * Represents the discordlist.space service.
 * @see https://docs.discordlist.space/
 */
export default class DiscordListSpace extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return [
      'discordlistspace',
      'discordlist.space',
      'botlistspace',
      'botlist.space'
    ]
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://discordlist.space/img/android-chrome-512x512.png'
  }

  /** Service's name. */
  static get serviceName() {
    return 'discordlist.space'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://discordlist.space'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://api.discordlist.space/v2'
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
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      data: { server_count: Util.resolveCount(serverCount) }
    })
  }

  /** Gets the statistics of this service. */
  getStatistics() {
    return this._request({ url: '/statistics' })
  }

  /**
   * Gets all the available languages that bots or servers can set as their language.
   * @param query The query to use in the request.
   */
  getLanguages(query?: Query) {
    return this._request({ url: '/languages', params: query })
  }

  /**
   * Gets all available tags for use on bots or servers.
   * @param query The query to use in the request.
   */
  getTags(query?: Query) {
    return this._request({ url: '/tags', params: query })
  }

  /**
   * Gets a list of bots on this service.
   * @param query The query to use in the request.
   */
  getBots(query?: Query) {
    return this._request({ url: '/bots', params: query })
  }

  /**
   * Gets the bot listed on this service.
   * @param id The bot's ID.
   */
  getBot(id: IDResolvable) {
    return this._request({ url: `/bots/${Util.resolveID(id)}` })
  }

  /**
   * Gets the reviews of a bot.
   * @param id The bot's ID.
   * @param query The query to use in the request.
   */
  getBotReviews(id: IDResolvable, query?: Query) {
    return this._request({
      url: `/bots/${Util.resolveID(id)}/reviews`,
      params: query
    })
  }

  /**
   * Gets the analytics on a bot.
   * @param id The bot's ID.
   * @param query The query to use in the request.
   */
  getBotAnalytics(id: IDResolvable, query?: Query) {
    return this._request(
      {
        url: `/bots/${Util.resolveID(id)}/analytics`,
        headers: { Authorization: this.token },
        params: query
      },
      { requiresToken: true }
    )
  }

  /**
   * Gets the list of people who voted this bot on this service.
   * @param id The bot's ID.
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
   * Checks if a specific user has upvoted the bot.
   * @param botID The bot's ID.
   * @param userID The user's ID.
   */
  getUserUpvote(botID: IDResolvable, userID: IDResolvable) {
    return this._request(
      {
        url: `/bots/${Util.resolveID(botID)}/upvotes/status/${Util.resolveID(
          userID
        )}`,
        headers: { Authorization: this.token }
      },
      { requiresToken: true }
    )
  }

  /**
   * Gets the top upvoters of this month.
   * @param id The bot's ID.
   * @param query The query to use with the request.
   */
  getUpvoteLeaderboard(id: IDResolvable, query?: Query) {
    return this._request({
      url: `/bots/${Util.resolveID(id)}/upvotes/leaderboard`,
      params: query
    })
  }

  /**
   * Gets the bot listing audit log.
   * @param id The bot's ID.
   * @param query The query to use with the request.
   */
  getAuditLog(id: IDResolvable, query?: Query) {
    return this._request(
      {
        url: `/bots/${Util.resolveID(id)}/audit`,
        headers: { Authorization: this.token },
        params: query
      },
      { requiresToken: true }
    )
  }

  /**
   * Gets the owners of the bot listing.
   * @param id The bot's ID.
   * @param query The query to use in the request.
   */
  getBotOwners(id: IDResolvable, query?: Query) {
    return this._request({
      url: `/bots/${Util.resolveID(id)}/owners`,
      params: query
    })
  }

  /**
   * Gets the user listed on this service.
   * @param id The user's ID.
   */
  getUser(id: IDResolvable) {
    return this._request({ url: `/users/${Util.resolveID(id)}` })
  }

  /**
   * Gets the user's bots listed for this service.
   * @param id The user's ID.
   */
  getUserBots(id: IDResolvable) {
    return this._request({
      url: `/users/${Util.resolveID(id)}/bots`,
      headers: { Authorization: this.token }
    })
  }

  /**
   * Get all the lists that a user owns.
   * @param id The user's ID.
   * @param query The query to use in the request.
   */
  getUserReviews(id: IDResolvable, query?: Query) {
    return this._request({
      url: `/users/${Util.resolveID(id)}/reviews`,
      params: query
    })
  }
}
