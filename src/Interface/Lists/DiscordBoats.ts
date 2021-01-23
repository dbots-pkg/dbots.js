import { Service, ServicePostOptions } from '../Service'
import { Util, IDResolvable } from '../../Utils/Util'
import { Query } from '../../Utils/Constants'

/**
 * Represents the Discord Boats service.
 * @see https://discord.boats/api/docs
 */
export default class DiscordBoats extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['discordboats', 'discord.boats']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://i.olsh.me/icon?size=1..100..500&url=discord.boats'
  }

  /** Service's name. */
  static get serviceName() {
    return 'Discord Boats'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://discord.boats'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://discord.boats/api/v2'
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
      url: `/bot/${Util.resolveID(clientID)}`,
      headers: { Authorization: token },
      data: { server_count: Util.resolveCount(serverCount) }
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
   * Gets the user listed on this service.
   * @param id The user's ID
   */
  getUser(id: IDResolvable) {
    return this._request({ url: `/user/${Util.resolveID(id)}` })
  }

  /**
   * Checks whether or not a user has voted for a bot on this service.
   * @param id The bot's ID
   * @param userID The user's ID
   */
  userVoted(id: IDResolvable, userID: IDResolvable) {
    return this._request({
      url: `/bot/${Util.resolveID(id)}/voted`,
      params: { id: Util.resolveID(userID) }
    })
  }

  /**
   * Gets the widget URL for this bot.
   * @param id The bot's ID
   * @param query The query string that will be used in the request
   */
  getWidgetURL(id: IDResolvable, query?: Query) {
    return this._appendQuery(`/widget/${Util.resolveID(id)}`, query || {})
  }
}
