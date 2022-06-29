import { Service, ServicePostOptions } from '../Service'
import { Util, IDResolvable } from '../../Utils/Util'
import { Query } from '../../Utils/Constants'

/**
 * Represents the Radar Bot Directory service.
 * @see https://radarbotdirectory.xyz/docs/
 */
export default class RadarBotDirectory extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['radar', 'radarbots', 'radarbotdirectory.xyz']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://radarbotdirectory.xyz/static/logo.png'
  }

  /** Service's name. */
  static get serviceName() {
    return 'Radar Bot Directory'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://radarbotdirectory.xyz'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://radarbotdirectory.xyz/api'
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
        : { server_count: Util.resolveCount(serverCount) }
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
   * Gets the Unix Epoch Timestamp of the last vote on this bot from this user on this service.
   * @param id The bot's ID
   * @param user The user's ID
   */
  getBotVotes(id: IDResolvable, user: IDResolvable) {
    return this._request(
      {
        url: `/lastvoted/${Util.resolveID(user)}/${Util.resolveID(id)}`,
        headers: { Authorization: this.token }
      },
      {
        requiresToken: true
      }
    )
  }

  
}