import { Service, ServicePostOptions } from '../Service'
import { Util, IDResolvable } from '../../Utils/Util'

/**
 * Represents the DiscordListology service.
 * @see https://discordlistology.com/developer/documentation
 */
export default class DiscordListology extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['discordlistology', 'discordlistology.com']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://discordlistology.com/idiscord.png'
  }

  /** Service's name. */
  static get serviceName() {
    return 'DiscordListology'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://discordlistology.com/'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://discordlistology.com/api/v1'
  }

  /**
   * Posts statistics to this service.
   * @param options The options of the request
   */
  static post(options: ServicePostOptions) {
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
