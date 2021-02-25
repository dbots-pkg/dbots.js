import { Service, ServicePostOptions } from '../Service'
import { Util, IDResolvable } from '../../Utils/Util'

/**
 * Represents the TopCord service.
 * @see https://docs.topcord.xyz/#/API
 */
export default class TopCord extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['topcord', 'topcord.xyz']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://avatars0.githubusercontent.com/u/69593894?v=4'
  }

  /** Service's name. */
  static get serviceName() {
    return 'TopCord'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://topcord.xyz/'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://api.topcord.xyz'
  }

  /**
   * Posts statistics to this service.
   * @param options The options of the request
   */
  static post(options: ServicePostOptions) {
    const { token, clientID, serverCount, shard } = options
    return super._post({
      method: 'post',
      url: `/bot/${Util.resolveID(clientID)}/stats`,
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
   * Lists every bot on this service.
   */
  getBots() {
    return this._request({ url: `/bots` })
  }
}
