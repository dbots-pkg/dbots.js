import { Service, ServicePostOptions } from '../Service'
import { Util, IDResolvable } from '../../Utils/Util'

/**
 * Represents the Radarcord service.
 * @see https://docs.radarcord.net/
 */
export default class Radarcord extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['radar', 'radarbots', 'radarbotdirectory.xyz', 'radarcord', 'radarcord.net']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://radarcord.net/static/logo.png'
  }

  /** Service's name. */
  static get serviceName() {
    return 'Radarcord'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://radarcord.net'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://radarcord.net/api'
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
            guilds: Util.resolveCount(serverCount),
            shards: shard.count
          }
        : { guilds: Util.resolveCount(serverCount) }
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
   * Gets the Unix Epoch Timestamp of the last time this user voted for this bot on this service.
   * @param botID The bot's ID
   * @param userID The user's ID
   */
  getBotVotes(botID: IDResolvable, userID: IDResolvable) {
    return this._request(
      {
        url: `/lastvoted/${Util.resolveID(userID)}/${Util.resolveID(botID)}`
      },
      {
        requiresToken: false
      }
    )
  }

  /**
   * Gets the username, ID and listed bots of user
   * @param userID The user's ID
   */
  getUser(userID: IDResolvable) {
    return this._request(
      {
        url: `/user/${Util.resolveID(userID)}`
      },
      {
        requiresToken: false
      }
    )
  }

  /**
   * Gets whether the user has voted for the bot
   * @param botID The bot's ID
   * @param userID The user's ID
   */
  getBotVotes(botID: IDResolvable, userID: IDResolvable) {
    return this._request(
      {
        url: `/hasvoted/${Util.resolveID(userID)}/${Util.resolveID(botID)}`
      },
      {
        requiresToken: false
      }
    )
  }
/**
   * Returns a 1 or 0 depending on whether the user has voted for the bot
   * @param botID The bot's ID
   * @param userID The user's ID
   */
  getBotVotes(botID: IDResolvable, userID: IDResolvable) {
    return this._request(
      {
        url: `/hasvoted/${Util.resolveID(userID)}/${Util.resolveID(botID)}`
      },
      {
        requiresToken: false
      }
    )
  }
/**
   * Get listed reviews of bot
   * @param botID The bot's ID
   */
  getBotVotes(botID: IDResolvable, userID: IDResolvable) {
    return this._request(
      {
        url: `/bot/${Util.resolveID(userID)}/reviews`
      },
      {
        requiresToken: false
      }
    )
  }
}
