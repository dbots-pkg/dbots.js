import { Service, ServicePostOptions } from '../Service'
import { Util, IDResolvable } from '../../Utils/Util'

/**
 * Represents the BotsDataBase service.
 * @see https://docs.botsdatabase.com/
 */
export default class BotsDataBase extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['botsdatabase', 'bdb']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://botsdatabase.com/images/icons/favicon-96x96.png'
  }

  /** Service's name. */
  static get serviceName() {
    return 'BotsDataBase'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://botsdatabase.com'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://api.botsdatabase.com/v1'
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
      url: `/bots/${Util.resolveID(clientID)}`,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      data: { servers: Util.resolveCount(serverCount) }
    })
  }

  /**
   * Gets the user listed on this service.
   * @param id The user's ID
   */
  getUser(id: IDResolvable) {
    return this._request({ url: `/users/${Util.resolveID(id)}` })
  }

  /**
   * Gets the bot listed on this service.
   * @param id The bot's ID
   */
  getBot(id: IDResolvable) {
    return this._request({ url: `/bots/${Util.resolveID(id)}` })
  }

  /**
   * Gets the list of people who voted this bot on this service.
   * @param id The bot's ID
   */
  getBotVotes(id: IDResolvable) {
    return this._request(
      {
        url: `/bots/${Util.resolveID(id)}/votes`,
        headers: { Authorization: this.token }
      },
      { requiresToken: true }
    )
  }
}
