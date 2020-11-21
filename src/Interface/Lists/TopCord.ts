import ServiceBase, { ServiceBasePostOptions } from '../ServiceBase'
import Util, { IDResolvable } from '../../Utils/Util'

/**
 * Represents the TopCord service.
 * @see https://docs.topcord.xyz/#/API
 */
export default class TopCord extends ServiceBase {
  static get aliases() {
    return ['topcord', 'topcord.xyz']
  }

  static get logoURL() {
    return 'https://avatars0.githubusercontent.com/u/69593894?v=4'
  }

  static get serviceName() {
    return 'TopCord'
  }

  static get websiteURL() {
    return 'https://topcord.xyz/'
  }

  static get baseURL() {
    return 'https://topcord.xyz/api'
  }

  /**
   * Posts statistics to this service.
   * @param options The options of the request
   */
  static post(options: ServiceBasePostOptions) {
    const { token, clientID, serverCount, shard } = options
    return super._post({
      method: 'post',
      url: `/bot/stats/${Util.resolveID(clientID)}`,
      headers: { Authorization: token },
      data: shard ?
        {
          guilds: Util.resolveCount(serverCount),
          shards: shard.count
        } :
        { guilds: Util.resolveCount(serverCount) }
    })
  }

  /**
   * Gets the bot listed on this service.
   * @param id The bot's ID
   */
  getBot(id: IDResolvable) {
    return this._request({ url: `/bot/${Util.resolveID(id)}` })
  }
}
