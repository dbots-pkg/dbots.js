import { Service, ServicePostOptions } from '../Service'
import { Util, IDResolvable } from '../../Utils/Util'

/**
 * Represents the BotlistMe service.
 * @see https://docs.botlist.me
 */
export default class BotlistMe extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['botlistme', 'botlist.me']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://botlist.me/icon.png'
  }

  /** Service's name. */
  static get serviceName() {
    return 'BotlistMe'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://botlist.me/'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://api.botlist.me/api/v1'
  }

  /**
   * Posts statistics to this service.
   * <warn>Shard data posting is not supported for this service.</warn>
   * @param options The options of the request.
   */
  static post(options: ServicePostOptions) {
    const { token, clientID, serverCount } = options
    return super._post({
      method: 'post',
      url: `/bots/${Util.resolveID(clientID)}/stats/`,
      headers: { Authorization: token },
      data: { server_count: Util.resolveCount(serverCount) }
    })
  }

  /**
   * Gets whether a user has voted for a bot.
   * @param botID The bot's ID.
   * @param userID The user's ID.
   */
  userVoted(botID: IDResolvable, userID: IDResolvable) {
    return this._request(
      {
        url: `/bots/${Util.resolveID(botID)}/voted`,
        headers: { Authorization: this.token },
        params: { user_id: Util.resolveID(userID) }
      },
      { requiresToken: true }
    )
  }
}
