import { Service, ServicePostOptions } from '../Service'
import { Util, IDResolvable } from '../../Utils/Util'
import { Query } from '../../Utils/Constants'

/**
 * Represents the FatesList service.
 * @see https://fateslist.xyz/api/docs/endpoints
 */
export default class FatesList extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['fateslist', 'fateslist.xyz']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://cdn.discordapp.com/avatars/798951566634778641/dfb619dd43f9039dbd4d7854845aa0ca.png'
  }

  /** Service's name. */
  static get serviceName() {
    return 'Fates List'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://fateslist.xyz/'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://fateslist.xyz/api'
  }

  /**
   * Posts statistics to this service.
   * <warn>Shard data posting is not supported for this service.</warn>
   * @param options The options of the request
   */
  static post(options: ServicePostOptions) {
    const { token, clientID, serverCount, userCount, shard } = options
    return super._post({
      method: 'post',
      url: `/bots/${Util.resolveID(clientID)}/stats`,
      headers: { Authorization: token },
      data: {
        guild_count: Util.resolveCount(serverCount),
        user_count: Util.resolveCount(userCount),
        ...(shard
          ? {
              shards: shard.count
            }
          : {})
      }
    })
  }

  /**
   * Gets a bot promotion
   * @param id The bot's ID
   */
  getPromotion(id: IDResolvable) {
    return this._request({ url: `/bots/${Util.resolveID(id)}/promotions` })
  }

  /**
   * Adds a bot promotion
   * @param botID The bot's ID
   * @param promotionData The promotion payload
   */
  addPromotion(botID: IDResolvable, promotionData: any) {
    return this._request(
      {
        method: 'post',
        url: `/bots/${Util.resolveID(botID)}/promotions`,
        headers: {
          Authorization: this.token
        },
        data: promotionData
      },
      { requiresToken: true }
    )
  }

  /**
   * Deletes a bot promotion, or every promotion if no id is provided
   * @param botID The bot's ID
   * @param promotionID The promotion ID
   */
  deletePromotion(botID: IDResolvable, promotionID?: string) {
    return this._request(
      {
        method: 'delete',
        url: `/bots/${Util.resolveID(botID)}/promotions`,
        headers: {
          Authorization: this.token
        },
        data: { promo_id: promotionID }
      },
      { requiresToken: true }
    )
  }

  /**
   * Edits a bot promotion
   * @param botID The bot's ID
   * @param promotionData The promotion payload
   */
  editPromotion(botID: IDResolvable, promotionData: any) {
    return this._request(
      {
        method: 'patch',
        url: `/bots/${Util.resolveID(botID)}/promotions`,
        headers: {
          Authorization: this.token
        },
        data: promotionData
      },
      { requiresToken: true }
    )
  }

  /**
   * Regenrates the API token
   * @param botID The bot's ID
   */
  regenerateToken(botID: IDResolvable) {
    return this._request(
      {
        method: 'patch',
        url: `/bots/${Util.resolveID(botID)}/token`,
        headers: {
          Authorization: this.token
        }
      },
      { requiresToken: true }
    )
  }

  /** Gets a random bot */
  getRandomBot() {
    return this._request({ url: '/bots/random' })
  }

  /**
   * Gets a bot from the API
   * @param id The bot's ID
   * @param query Query to use
   */
  getBot(id: IDResolvable, query?: Query) {
    return this._request({
      url: `/bots/${Util.resolveID(id)}`,
      headers: { Authorization: this.token }, // Token is not required but gives access to more info
      params: query
    })
  }

  /**
   * Get a bot's commands
   * @param id The bot's ID
   */
  getBotCommands(id: IDResolvable) {
    return this._request({ url: `/bots/${Util.resolveID(id)}/commands` })
  }

  /**
   * Adds a command to a bot
   * @param botID The bot's ID
   * @param commandData The command payload
   * @param query The query to use
   */
  addBotCommand(botID: IDResolvable, commandData: any, query?: Query) {
    return this._request(
      {
        method: 'post',
        url: `/bots/${Util.resolveID(botID)}/commands`,
        headers: { Authorization: this.token },
        params: query,
        data: commandData
      },
      { requiresToken: true }
    )
  }

  /**
   * Deletes a bot's command
   * @param botID The bot's ID
   * @param commandID The command ID
   */
  deleteBotCommand(botID: IDResolvable, commandID: string) {
    return this._request(
      {
        method: 'delete',
        url: `/bots/${Util.resolveID(botID)}/commands`,
        headers: { Authorization: this.token },
        data: { id: commandID }
      },
      { requiresToken: true }
    )
  }

  /**
   * Edits a bot's command
   * @param botID The bot's ID
   * @param commandData The command payload
   */
  editBotCommand(botID: IDResolvable, commandData: any) {
    return this._request(
      {
        method: 'patch',
        url: `/bots/${Util.resolveID(botID)}/commands`,
        headers: { Authorization: this.token },
        data: commandData
      },
      { requiresToken: true }
    )
  }

  /**
   * Gets the number of votes a user gave to a bot
   * @param botID The bot's ID
   * @param userID The user's ID
   */
  getVotes(botID: IDResolvable, userID: IDResolvable) {
    return this._request(
      {
        url: `/bots/${Util.resolveID(botID)}/votes`,
        headers: { Authorization: this.token },
        params: { user_id: Util.resolveID(userID) }
      },
      { requiresToken: true }
    )
  }

  /**
   * Gets the votes a user gave to a bot with timestamps
   * @param botID The bot's ID
   * @param userID The user's ID
   */
  getTimestampedVotes(botID: IDResolvable, userID: IDResolvable) {
    return this._request(
      {
        url: `/bots/${Util.resolveID(botID)}/votes/timestamped`,
        headers: { Authorization: this.token },
        params: { user_id: Util.resolveID(userID) }
      },
      { requiresToken: true }
    )
  }

  /**
   * Allows you to enable or disable the maintenance status
   * @param botID The bot's ID
   * @param maintenanceData The maintenance payload
   */
  setMaintenance(botID: IDResolvable, maintenanceData?: any) {
    return this._request(
      {
        method: 'post',
        url: `/bots/${Util.resolveID(botID)}/maintenance`,
        headers: { Authorization: this.token },
        data: maintenanceData
      },
      { requiresToken: true }
    )
  }

  /**
   * Gets a service feature
   * @param featureName The internal name of the feature
   */
  getFeature(featureName: string) {
    return this._request({ url: `/features/${featureName}` })
  }

  /**
   * Gets a service tag
   * @param tagName The internal name of the tag
   */
  getTag(tagName: string) {
    return this._request({ url: `/tags/${tagName}` })
  }

  /**
   * Gets a vanity from the service
   * @param vanity The vanity string
   */
  getVanity(vanity: string) {
    return this._request({ url: `/vanity/${vanity}` })
  }

  /**
   * Gets a user from the service
   * @param id The user's id
   */
  getUser(id: IDResolvable) {
    return this._request({ url: `/users/${Util.resolveID(id)}` })
  }

  /**
   * Sets your user's description
   * @param userID The user's id
   * @param description The new description
   */
  setUserDescription(userID: IDResolvable, description: string) {
    return this._request(
      {
        method: 'patch',
        url: `/users/${Util.resolveID(userID)}/description`,
        headers: { Authorization: this.token },
        data: { description }
      },
      { requiresToken: true }
    )
  }

  /** Gets the bot index page */
  getBotIndex() {
    return this._request({ url: '/bots/ext/index' })
  }

  /** Gets the bot search page */
  getSearch() {
    return this._request({ url: '/bots/ext/search' })
  }

  /**
   * Gets the rendered bot description preview
   * @param previewData The preview payload
   */
  getDescriptionPreview(previewData: any) {
    return this._request({
      method: 'post',
      url: `/preview`,
      data: previewData
    })
  }

  /**
   * Gtes the valid servers on the service
   * @param userID The user's ID
   */
  getValidServers(userID: IDResolvable) {
    return this._request({
      url: `/users/${Util.resolveID(userID)}/valid_servers`
    })
  }
}
