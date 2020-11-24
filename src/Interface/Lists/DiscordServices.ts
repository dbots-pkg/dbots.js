import ServiceBase, { ServiceBasePostOptions } from '../ServiceBase'
import Util, { IDResolvable } from '../../Utils/Util'

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
export default class DiscordServices extends ServiceBase {
  static get aliases() {
    return ['discordservices', 'discordservices.net']
  }

  static get logoURL() {
    return 'https://discordservices.net/icon.png'
  }

  static get serviceName() {
    return 'Discord Services'
  }

  static get websiteURL() {
    return 'https://discordservices.net'
  }

  static get baseURL() {
    return 'https://api.discordservices.net'
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
