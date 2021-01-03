import { Service, ServicePostOptions } from '../Service'
import { Util, IDResolvable } from '../../Utils/Util'

/**
 * Represents the DiscordBots.co service.
 * @see https://discordbots.co/api
 */
export default class DiscordBotsCo extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['discordbotsco']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://cdn.discordapp.com/avatars/688927563409522694/17cfd572fd3e2d3285534c12e0f58422.png'
  }

  /** Service's name. */
  static get serviceName() {
    return 'DiscordBots.co'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://discordbots.co'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://api.discordbots.co/v1/public'
  }

  /**
   * Posts statistics to this service.
   * @param options The options of the request
   */
  static post(options: ServicePostOptions) {
    const { token, clientID, serverCount, shard } = options
    return super._post({
      method: 'post',
      url: `/bot/${Util.resolveID(clientID)}/stats`,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      data: shard
        ? {
            serverCount: Util.resolveCount(serverCount),
            shardCount: shard.count
          }
        : { serverCount: Util.resolveCount(serverCount) }
    })
  }

  /**
   * Gets the bot listed on this service.
   * @param id The bot's ID
   */
  getBot(id: IDResolvable) {
    return this._request(
      {
        url: `/bot/${Util.resolveID(id)}`,
        headers: { Authorization: this.token }
      },
      {
        requiresToken: true
      }
    )
  }
}
