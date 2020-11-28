import ServiceBase, { ServiceBasePostOptions } from '../ServiceBase'
import Util, { AnyObject, IDResolvable } from '../../Utils/Util'

/**
 * Represents the LBots service.
 * @see https://lbots.org/api/docs
 */
export default class LBots extends ServiceBase {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['lbots', 'lbotsorg', 'lbots.org']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://i.olsh.me/icon?size=1..100..500&url=lbots.org'
  }

  /** Service's name. */
  static get serviceName() {
    return 'LBots'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://lbots.org/'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://lbots.org/api/v1'
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
            guild_count: Util.resolveCount(serverCount),
            shard_id: shard.id,
            shard_count: shard.count
          }
        : { guild_count: Util.resolveCount(serverCount) }
    })
  }

  /**
   * Invalidates the token being used in the request.
   * @param id The bot's ID
   */
  invalidate(id: IDResolvable) {
    return this._request(
      {
        url: `/bots/${Util.resolveID(id)}/invalidate`,
        headers: { Authorization: this.token }
      },
      {
        requiresToken: true
      }
    )
  }

  /**
   * Gets the list of people who favorited this bot on this service.
   * @param id The bot's ID
   */
  getBotFavorites(id: IDResolvable) {
    return this._request(
      {
        url: `/bot/${Util.resolveID(id)}/favorites`,
        headers: { Authorization: this.token }
      },
      {
        requiresToken: true
      }
    )
  }

  /**
   * Checks whether or not a user has favorited a bot on this service.
   * @param id The bot's ID
   * @param userID The user's ID
   */
  userFavorited(id: IDResolvable, userID: IDResolvable) {
    return this._request(
      {
        url: `/bots/${Util.resolveID(id)}/favorites/user/${Util.resolveID(
          userID
        )}`,
        headers: { Authorization: this.token }
      },
      {
        requiresToken: true
      }
    )
  }

  /**
   * Updates the guilds on the bot's panel.
   * @param id The bot's ID
   * @param data The data being posted
   */
  updatePanelGuilds(id: IDResolvable, data: AnyObject) {
    return this._request(
      {
        method: 'post',
        url: `/panel/${Util.resolveID(id)}/guilds`,
        headers: { Authorization: this.token },
        data
      },
      {
        requiresToken: true
      }
    )
  }

  /**
   * Gets a guilds settings from the bot's panel.
   * @param id The bot's ID
   * @param guildID The guild's ID
   */
  getPanelGuildSettings(id: IDResolvable, guildID: IDResolvable) {
    return this._request(
      {
        url: `/panel/${Util.resolveID(id)}/guild/${Util.resolveID(guildID)}`,
        headers: { Authorization: this.token }
      },
      {
        requiresToken: true
      }
    )
  }

  /**
   * Gets a guilds settings from the bot's panel.
   * @param id The bot's ID
   * @param guildID The guild's ID
   * @param data The data being posted
   */
  updatePanelGuildSettings(
    id: IDResolvable,
    guildID: IDResolvable,
    data: AnyObject
  ) {
    return this._request(
      {
        url: `/panel/${Util.resolveID(id)}/guild/${Util.resolveID(
          guildID
        )}/update`,
        headers: { Authorization: this.token },
        data
      },
      {
        requiresToken: true
      }
    )
  }
}
