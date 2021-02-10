import { Service, ServicePostOptions } from '../Service'
import { Util, IDResolvable } from '../../Utils/Util'

/**
 * Represents the DBots service.
 * @see https://docs.dbots.co/
 */
export default class DBots extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['dbots', 'dbots.co']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://gblobscdn.gitbook.com/spaces%2F-MO490c2KMEgwyXnbtbV%2Favatar-1607528014691.png'
  }

  /** Service's name. */
  static get serviceName() {
    return 'DBots.co'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://dbots.co/'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://dbots.co/api/v1'
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
      url: `/bots/${Util.resolveID(clientID)}/stats`,
      headers: { Authorization: token },
      data: { guildCount: Util.resolveCount(serverCount) }
    })
  }

  /**
   * Gets the bot's audit logs.
   * @param id The bot's ID
   */
  getAudit(id: IDResolvable) {
    return this._request(
      {
        url: `/bots/${Util.resolveID(id)}/log`,
        headers: { Authorization: this.token }
      },
      { requiresToken: true }
    )
  }

  /**
   * Regenerates the bot API token.
   * @param id The bot's ID
   */
  regenToken(id: IDResolvable) {
    return this._request(
      {
        url: `/bots/${Util.resolveID(id)}/keys/regen`,
        headers: { Authorization: this.token }
      },
      { requiresToken: true }
    )
  }
}
