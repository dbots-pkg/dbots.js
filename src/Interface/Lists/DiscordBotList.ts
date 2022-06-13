import { Service, ServicePostOptions } from '../Service'
import { Util, AnyObject } from '../../Utils/Util'

/**
 * Represents the Discord Bot List service.
 * @see https://discordbotlist.com/api-docs
 */
export default class DiscordBotList extends Service {
  /** The values that can be used to select the service. */
  static get aliases() {
    return ['discordbotlist', 'discordbotlist.com']
  }

  /** The logo URL. */
  static get logoURL() {
    return 'https://discordbotlist.com/android-icon-192x192.png'
  }

  /** Service's name. */
  static get serviceName() {
    return 'Discord Bot List'
  }

  /** The website URL. */
  static get websiteURL() {
    return 'https://discordbotlist.com'
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return 'https://discordbotlist.com/api/v1'
  }

  /**
   * Posts statistics to this service.
   * @param options The options of the request
   */
  static post(options: ServicePostOptions) {
    const { token, clientID, serverCount, shard, userCount, voiceConnections } =
      options
    const data: AnyObject = { guilds: Util.resolveCount(serverCount) }
    if (shard) data.shard_id = shard.id
    if (userCount) data.users = Util.resolveCount(userCount)
    if (voiceConnections)
      data.voice_connections = Util.resolveCount(voiceConnections)

    return super._post({
      method: 'post',
      url: `/bots/${Util.resolveID(clientID)}/stats`,
      headers: { Authorization: `Bot ${token}` },
      data
    })
  }
}
