import ServiceBase, { ServiceBasePostOptions } from '../ServiceBase'
import Util, { IDResolvable } from '../../Utils/Util'

/**
 * Represents the DiscordBots.co service.
 * @see https://discordbots.co/api
 */
export default class DiscordBotsCo extends ServiceBase {
  static get aliases() {
    return ['discordbotsco']
  }

  static get logoURL() {
    return 'https://cdn.discordapp.com/avatars/688927563409522694/17cfd572fd3e2d3285534c12e0f58422.png'
  }

  static get serviceName() {
    return 'DiscordBots.co'
  }

  static get websiteURL() {
    return 'https://discordbots.co'
  }

  static get baseURL() {
    return 'https://api.discordbots.co/v1/public'
  }

  /**
   * Posts statistics to this service.
   * @param options The options of the request
   */
  static post(options: ServiceBasePostOptions) {
    const { token, clientID, serverCount, shard } = options
    return super._post({
      method: 'post',
      url: `/bot/${Util.resolveID(clientID)}/stats`,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      data: shard ?
        {
          serverCount: Util.resolveCount(serverCount),
          shardCount: shard.count
        } :
        { serverCount: Util.resolveCount(serverCount) }
    })
  }

  /**
   * Gets the bot listed on this service.
   * @param id The bot's ID
   */
  getBot(id: IDResolvable) {
    return this._request({
      url: `/bot/${Util.resolveID(id)}`,
      headers: { Authorization: this.token }
    }, {
      requiresToken: true
    })
  }
}

