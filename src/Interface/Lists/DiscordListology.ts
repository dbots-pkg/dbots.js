import ServiceBase, { ServiceBasePostOptions } from '../ServiceBase'
import Util, { IDResolvable } from '../../Utils/Util'

/**
 * Represents the DiscordListology service.
 * @see https://discordlistology.com/developer/documentation
 */
export default class DiscordListology extends ServiceBase {
  static get aliases() {
    return ['discordlistology']
  }

  static get logoURL() {
    return 'https://discordlistology.com/idiscord.png'
  }

  static get serviceName() {
    return 'DiscordListology'
  }

  static get websiteURL() {
    return 'https://discordlistology.com/'
  }

  static get baseURL() {
    return 'https://discordlistology.com/api/v1'
  }

  /**
   * Posts statistics to this service.
   * @param options The options of the request
   */
  static post(options: ServiceBasePostOptions) {
    const { token, clientID, serverCount, shard } = options
    return super._post({
      method: 'post',
      url: `/bots/${Util.resolveID(clientID)}/stats`,
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
   * Gets the bot's stats listed on this service.
   * @param id The bot's ID
   */
  getBotStats(id: IDResolvable) {
    return this._request({ url: `/bots/${Util.resolveID(id)}/stats` })
  }

  /**
   * Checks whether or not a user has voted for a bot on this service.
   * @param id The bot's ID
   * @param userID The user's ID
   */
  userVotedBot(id: IDResolvable, userID: IDResolvable) {
    return this._request({
      url: `/bots/${Util.resolveID(userID)}/hasvoted/${Util.resolveID(id)}`
    })
  }

  /**
   * Gets the guild's stats listed on this service.
   * @param id The guild's ID
   */
  getGuildStats(id: IDResolvable) {
    return this._request({ url: `/guilds/${Util.resolveID(id)}/stats` })
  }

  /**
   * Checks whether or not a user has voted for a guild on this service.
   * @param id The guild's ID
   * @param userID The user's ID
   */
  userVotedGuild(id: IDResolvable, userID: IDResolvable) {
    return this._request({
      url: `/guilds/${Util.resolveID(userID)}/hasvoted/${Util.resolveID(id)}`
    })
  }
}
