import { Service, ServicePostOptions } from '../Service'
import { IDResolvable, Util } from '../../Utils/Util'

/**
 * Represents the Botrix List service.
 * @see https://docs.botrix.cc/
 */
export default class Botrix extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['btorix', 'botrix.cc']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://media.discordapp.net/attachments/748427107968745512/810018388126597120/botrix_swirl.png'
  }

  /** Service's name. */
  static get serviceName() {
    return 'Botrix'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://botrix.cc/'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://botrix.cc/api/v1'
  }

  /**
   * Posts statistics to this service.
   * @param options The options of the request
   */
  static post(options: ServicePostOptions) {
    const { clientID, /* token,*/ serverCount, shard, userCount } = options
    return super._post({
      method: 'post',
      url: `/bot/${Util.resolveID(clientID)}`,
      // As of now, the API has no tokens...
      // headers: {
      //   authorization: token
      // },
      data: {
        servers: Util.resolveCount(serverCount),
        users: Util.resolveCount(userCount),
        ...(shard?.count
          ? {
              shards: Util.resolveCount(shard.count)
            }
          : {})
      }
    })
  }

  /**
   * Gets the bot listed on this service.
   * @param id The bot's ID
   */
  getBot(id: IDResolvable) {
    return this._request({
      url: `/bot/${Util.resolveID(id)}`
    })
  }

  /**
   * Checks whether or not a user has voted for a bot on this service.
   * @param id The bot's ID
   * @param userID The user's ID
   */
  userVoted(id: IDResolvable, userID: IDResolvable) {
    return this._request({
      url: `/voted/${Util.resolveID(id)}/${Util.resolveID(userID)}`
    })
  }
}
