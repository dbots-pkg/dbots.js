import { Service, ServicePostOptions } from '../Service'
import { Util, IDResolvable } from '../../Utils/Util'
import { Query } from '../../Utils/Constants'

/**
 * Represents the YABL service.
 * @see https://yabl.xyz/api
 */
export default class YABL extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['yabl', 'yablxyz', 'yabl.xyz']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://i.imgur.com/OFiMern.png'
  }

  /** Service's name. */
  static get serviceName() {
    return 'Yet Another Bot List'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://yabl.xyz/'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://yabl.xyz/api'
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
      url: `/bot/${Util.resolveID(clientID)}/stats`,
      headers: { Authorization: token },
      data: { guildCount: Util.resolveCount(serverCount) }
    })
  }

  /** Invalidates the token being used in the request. */
  invalidate() {
    return this._request(
      {
        url: '/token/invalidate',
        headers: { Authorization: this.token }
      },
      {
        requiresToken: true
      }
    )
  }

  /**
   * Gets the bot listed on this service.
   * @param id The bot's ID
   */
  getBot(id: IDResolvable) {
    return this._request({ url: `/bot/${Util.resolveID(id)}` })
  }

  /** Gets 20 random bots from this service. */
  getRandomBots() {
    return this._request({ url: '/bots' })
  }

  /**
   * Gets the user's bots listed for this service.
   * @param id The user's ID
   */
  getUserBots(id: IDResolvable) {
    return this._request({ url: `/bots/user/${Util.resolveID(id)}` })
  }

  /** Gets a list of bots on this service. */
  getBots() {
    return this._request(
      {
        url: '/bots/all',
        headers: { Authorization: this.token }
      },
      {
        requiresToken: true
      }
    )
  }

  /**
   * Gets a page of bots on this service.
   * @param query The query string that will be used in the request
   */
  getBotsByPage(query: Query) {
    return this._request({ url: '/bots/page', params: query })
  }

  /** Gets a list of unverified bots on this service. */
  getUnverifiedBots() {
    return this._request(
      {
        url: '/bots/unverified',
        headers: { Authorization: this.token }
      },
      {
        requiresToken: true
      }
    )
  }
}
