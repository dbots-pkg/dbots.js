import { Service, ServicePostOptions } from '../Service'
import { Util, IDResolvable } from '../../Utils/Util'
import { Query } from '../../Utils/Constants'

/**
 * Represents the FatesList service.
 * @see https://fateslist.xyz/api/docs/redoc
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
    return 'https://fateslist.xyz/api/v2'
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
              shard_count: Util.resolveCount(shard.count)
            }
          : {})
      }
    })
  }

  /**
   * Gets the number of votes the bot has received.
   * @param id The bot's ID.
   */
  getVotesPerMonth(id: IDResolvable) {
    return this._request({
      url: `/bots/${Util.resolveID(id)}/vpm`
    })
  }

  /**
   * Regenerates a bot token. Use this if it is compromised.
   * @param id The bot's ID.
   */
  regenerateBotToken(id: IDResolvable) {
    return this._request(
      {
        method: 'patch',
        url: `/bots/${Util.resolveID(id)}/token`,
        headers: { Authorization: this.token }
      },
      { requiresToken: true }
    )
  }

  /**
   * Fetch a random bot.
   * @param query The query to use.
   */
  getRandomBot(query?: Query) {
    return this._request({
      url: `/bots/0/random`,
      params: query
    })
  }

  /**
   * Fetches bot information given a bot ID.
   * @param id The bot's ID.
   * @param query The query to use.
   */
  getBot(id: IDResolvable, query?: Query) {
    return this._request({
      url: `/bots/${Util.resolveID(id)}`,
      params: query
    })
  }

  /**
   * Checks whether the given bot id is listed.
   * @param id The bot's ID.
   */
  botExists(id: IDResolvable) {
    return this._request({
      method: 'head',
      url: `/bots/${Util.resolveID(id)}`
    })
  }

  /**
   * Gets the bot's WebSocket events.
   * @param id The bot's ID.
   */
  getBotWSEvents(id: IDResolvable) {
    return this._request({
      url: `/bots/${Util.resolveID(id)}/ws_events`
    })
  }
}
