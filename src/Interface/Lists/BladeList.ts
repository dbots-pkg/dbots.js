import { Service, ServicePostOptions } from '../Service'
import { Util, IDResolvable } from '../../Utils/Util'

/**
 * Represents the BladeList service.
 * @see https://docs.bladelist.gg/en/latest/api/index.html
 */
export default class BladeList extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['bladebotlist', 'bladebotlist.xyz', 'bladelist', 'bladelist.gg']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://bladelist.gg/static/img/logo.png'
  }

  /** Service's name. */
  static get serviceName() {
    return 'BladeList'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://bladelist.gg'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://api.bladelist.gg'
  }

  /**
   * Posts statistics to this service.
   * @param options The options of the request.
   */
  static post(options: ServicePostOptions) {
    const { token, clientID, serverCount, shard } = options
    return super._post({
      method: 'put',
      url: `/bots/${Util.resolveID(clientID)}/`,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      data: {
        server_count: Util.resolveCount(serverCount),
        ...(shard ? { shard_count: shard.count } : {})
      }
    })
  }

  /**
   * Gets a bot listed on this service.
   * @param id The bot's ID.
   */
  getBot(id: IDResolvable) {
    return this._request(
      {
        url: `/bots/${Util.resolveID(id)}`,
        headers: { Authorization: this.token }
      },
      { requiresToken: true }
    )
  }
}
