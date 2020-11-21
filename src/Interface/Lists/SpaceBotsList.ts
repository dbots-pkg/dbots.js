import ServiceBase, { ServiceBasePostOptions } from '../ServiceBase'
import Util, { IDResolvable } from '../../Utils/Util'

/**
 * Represents the Space Bots List service.
 * @see https://spacebots.gitbook.io/tutorial-en/
 */
export default class SpaceBotsList extends ServiceBase {
  static get aliases() {
    return ['spacebotslist', 'spacebotlist', 'spacebots', 'space-bot-list.org', 'space', 'sbl']
  }

  static get logoURL() {
    return 'https://get.snaz.in/334CtqK.jpg'
  }

  static get serviceName() {
    return 'Space Bots List'
  }

  static get websiteURL() {
    return 'https://space-bot-list.xyz/'
  }

  static get baseURL() {
    return 'https://space-bot-list.xyz/api'
  }

  /**
   * Posts statistics to this service.
   * <warn>Shard data posting is not supported for this service.</warn>
   * @param options The options of the request
   */
  static post(options: ServiceBasePostOptions) {
    const { token, clientID, serverCount, userCount } = options
    return super._post({
      method: 'post',
      url: `/bots/${Util.resolveID(clientID)}`,
      headers: { Authorization: token },
      data: {
        guilds: Util.resolveCount(serverCount),
        users: Util.resolveCount(userCount)
      }
    })
  }

  /**
   * Gets the bot listed on this service.
   * @param id The bot's ID
   */
  getBot(id: IDResolvable) {
    return this._request({ url: `/bots/${Util.resolveID(id)}` })
  }
}

