import { Service, ServicePostOptions } from '../Service'
import { Util, IDResolvable } from '../../Utils/Util'

/**
 * Represents the Listcord service.
 * @see https://listcord.gg/docs
 */
export default class Listcord extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['listcord', 'listcord.gg']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://cdn.discordapp.com/avatars/803339251940196383/50e92bb535cf88641ec22756937e6950.webp'
  }

  /** Service's name. */
  static get serviceName() {
    return 'Listcord'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://listcord.gg/'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://listcord.gg/api/'
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
   * Gets a bot.
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

  /**
   * Gets a bot's reviews.
   * @param id The bot's ID.
   */
  getBotReviews(id: IDResolvable) {
    return this._request(
      {
        url: `/bot/${Util.resolveID(id)}/reviews`,
        headers: { Authorization: this.token }
      },
      { requiresToken: true }
    )
  }

  /**
   * Gets whether a user has voted for a bot.
   * @param botID The bot's ID.
   * @param userID The user's ID.
   */
  userVoted(botID: IDResolvable, userID: IDResolvable) {
    return this._request(
      {
        url: `/bot/${Util.resolveID(botID)}/voted`,
        headers: { Authorization: this.token },
        params: { user_id: Util.resolveID(userID) }
      },
      { requiresToken: true }
    )
  }

  /**
   * Gets a bot pack.
   * @param id The pack's id.
   */
  getBotPack(id: string) {
    return this._request(
      {
        url: `/pack/${id}`,
        headers: { Authorization: this.token }
      },
      { requiresToken: true }
    )
  }

  /** Gets all botpacks. */
  getBotPacks() {
    return this._request(
      {
        url: '/packs',
        headers: { Authorization: this.token }
      },
      { requiresToken: true }
    )
  }
}
