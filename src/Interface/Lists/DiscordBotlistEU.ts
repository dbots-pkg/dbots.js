import { Service, ServicePostOptions } from '../Service'
import { Util, IDResolvable } from '../../Utils/Util'

/**
 * Represents the DiscordBotlistEU service.
 * @see https://docs.discord-botlist.eu/
 */
export default class DiscordBotlistEU extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['dbleu', 'discordbotlisteu']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://cdn.discord-botlist.eu/pictures/logo.png'
  }

  /** Service's name. */
  static get serviceName() {
    return 'DiscordBotlist.EU'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://discord-botlist.eu/'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://api.discord-botlist.eu/v1'
  }

  /**
   * Posts statistics to this service.
   * <warn>Shard data posting is not supported for this service.</warn>
   * @param options The options of the request
   */
  static post(options: ServicePostOptions) {
    const { token, serverCount } = options
    return super._post({
      method: 'post',
      url: `/update`,
      headers: { Authorization: token },
      data: { serverCount: Util.resolveCount(serverCount) }
    })
  }

  /**
   * Get's the bots votes
   */
  getVotes() {
    return this._request(
      {
        url: `/votes`,
        headers: { Authorization: this.token }
      },
      { requiresToken: true }
    )
  }
}
