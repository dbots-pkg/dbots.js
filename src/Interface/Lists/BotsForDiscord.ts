import Service, { ServicePostOptions } from '../Service'
import Util, { IDResolvable } from '../../Utils/Util'
import { Query } from '../../Utils/Constants'

/**
 * Represents the Bots For Discord service.
 * @see https://docs.botsfordiscord.com/
 */
export default class BotsForDiscord extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['botsfordiscord', 'botsfordiscord.com', 'bfd']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://i.olsh.me/icon?size=1..100..500&url=botsfordiscord.com'
  }

  /** Service's name. */
  static get serviceName() {
    return 'Bots For Discord'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://botsfordiscord.com'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://botsfordiscord.com/api'
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
   * Gets the list of people who voted this bot on this service.
   * @param id The bot's ID
   */
  getBotVotes(id: IDResolvable) {
    return this._request({ url: `/bot/${Util.resolveID(id)}/votes` })
  }

  /**
   * Gets the user listed on this service.
   * @param id The user's ID
   */
  getUser(id: IDResolvable) {
    return this._request({ url: `/user/${Util.resolveID(id)}` })
  }

  /**
   * Gets the user's bots listed for this service.
   * @param id The user's ID
   */
  getUserBots(id: IDResolvable) {
    return this._request({ url: `/user/${Util.resolveID(id)}/bots` })
  }

  /**
   * Gets the widget URL for this bot.
   * @param id The bot's ID
   * @param query The query string that will be used in the request
   */
  getWidgetURL(id: IDResolvable, query?: Query) {
    return this._appendQuery(`/bot/${Util.resolveID(id)}/widget`, query || {})
  }
}
