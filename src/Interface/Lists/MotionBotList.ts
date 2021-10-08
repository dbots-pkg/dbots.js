import { Service, ServicePostOptions } from '../Service'
import { Util, IDResolvable } from '../../Utils/Util'

/**
 * Represents the MotionBotlist service.
 * @see https://www.motiondevelopment.top/docs/api/intro
 */
export default class MotionBotlist extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return [
      'motion',
      'motiondevelopment',
      'motionbotlist',
      'motiondevelopment.top'
    ]
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://www.motiondevelopment.top/favicon.ico'
  }

  /** Service's name. */
  static get serviceName() {
    return 'Motion Botlist'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://www.motiondevelopment.top/bot'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://www.motiondevelopment.top/api/v1.2'
  }

  /**
   * Posts statistics to this service.
   * <warn>Shard data posting is not supported for this service.</warn>
   * @param options The options of the request.
   */
  static post(options: ServicePostOptions) {
    const { token, clientID, serverCount } = options
    return super._post({
      method: 'put',
      url: `/bots/${Util.resolveID(clientID)}/stats`,
      headers: {
        key: token,
        'Content-Type': 'application/json'
      },
      data: { guilds: Util.resolveCount(serverCount) }
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
        headers: {
          key: this.token,
          'Content-Type': 'application/json'
        }
      },
      { requiresToken: true }
    )
  }

  /**
   * Gets a bot's votes.
   * @param id The bot's ID.
   */
  getBotVotes(id: IDResolvable) {
    return this._request(
      {
        url: `/bots/${Util.resolveID(id)}/votes`,
        headers: {
          key: this.token,
          'Content-Type': 'application/json'
        }
      },
      { requiresToken: true }
    )
  }
}
