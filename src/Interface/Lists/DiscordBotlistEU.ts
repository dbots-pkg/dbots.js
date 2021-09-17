import { Service, ServicePostOptions } from '../Service'
import { Util } from '../../Utils/Util'

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
      headers: { Authorization: `Bearer ${token}` },
      data: { serverCount: Util.resolveCount(serverCount) }
    })
  }

  /** Gets this bot */
  getBot() {
    return this._request(
      {
        url: `/ping`,
        headers: { Authorization: `Bearer ${this.token}` }
      },
      { requiresToken: true }
    )
  }

  /** Gets this bot's analytics */
  getAnalytics() {
    return this._request(
      {
        url: `/analytics`,
        headers: { Authorization: `Bearer ${this.token}` }
      },
      { requiresToken: true }
    )
  }

  /** Gets the bot's votes */
  getVotes() {
    return this._request(
      {
        url: `/votes`,
        headers: { Authorization: `Bearer ${this.token}` }
      },
      { requiresToken: true }
    )
  }
}
