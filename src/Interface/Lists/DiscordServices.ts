import { Service, ServicePostOptions } from '../Service'
import { Util, IDResolvable } from '../../Utils/Util'

/** The options to use when posting command info for the DiscordServices service */
export interface DiscordServicesCommandInfo {
  /** The command name including the prefix */
  command: string

  /** The description for your command */
  desc: string

  /** The category of your command */
  category: string
}

/**
 * Represents the Discord Services service.
 * @see https://discordservices.net/docs/api
 */
export default class DiscordServices extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['discordservices', 'discordservices.net']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://discordservices.net/icon.png'
  }

  /** Service's name. */
  static get serviceName() {
    return 'Discord Services'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://discordservices.net'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://api.discordservices.net'
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
      headers: { Authorization: token },
      data: shard
        ? {
            servers: Util.resolveCount(serverCount),
            shards: shard.count
          }
        : { servers: Util.resolveCount(serverCount) }
    })
  }

  /**
   * Posts news to your bot page
   * @param id The bot's ID
   * @param title The title of the post
   * @param content The content of the post
   */
  postNews(id: IDResolvable, title: string, content: string) {
    return this._request(
      {
        method: 'post',
        url: `/bot/${Util.resolveID(id)}/news`,
        headers: { Authorization: this.token },
        data: {
          title,
          content,
          error: false
        }
      },
      { requiresToken: true }
    )
  }

  /**
   * Posts commands info to your bot page
   * @param id The bot's ID
   * @param commands The command info to post
   */
  postCommands(id: IDResolvable, commands: DiscordServicesCommandInfo[]) {
    return this._request(
      {
        method: 'post',
        url: `/bot/${Util.resolveID(id)}/commands`,
        headers: { Authorization: this.token },
        data: commands
      },
      { requiresToken: true }
    )
  }
}
