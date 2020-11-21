import ServiceBase, { ServiceBasePostOptions } from '../ServiceBase'
import Util, { IDResolvable } from '../../Utils/Util'

/**
 * Represents the Discord Labs service.
 * @see https://docs.discordlabs.org/docs/api/api
 */
export default class DiscordLabs extends ServiceBase {
  static get aliases() {
    return ['discordlabs', 'discord-labs', 'discordlabs.org', 'bots.discordlabs.org']
  }

  static get logoURL() {
    return 'https://avatars2.githubusercontent.com/u/54491479?v=4'
  }

  static get serviceName() {
    return 'Discord Labs'
  }

  static get websiteURL() {
    return 'https://bots.discordlabs.org/'
  }

  static get baseURL() {
    return 'https://bots.discordlabs.org/v2'
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
      data: shard
        ? {
          token,
          server_count: Util.resolveCount(serverCount),
          shard_count: shard.count
        }
        : {
          token,
          server_count: Util.resolveCount(serverCount)
        }
    })
  }

  /**
   * Gets the bot listed on this service.
   * @param id The bot's ID
   */
  getBot(id: IDResolvable) {
    return this._request({ url: `/bot/${Util.resolveID(id)}` })
  }
}

