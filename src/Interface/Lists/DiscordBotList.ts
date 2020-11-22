import ServiceBase, { ServiceBasePostOptions } from '../ServiceBase'
import Util, { AnyObject } from '../../Utils/Util'

/**
 * Represents the Discord Bot List service.
 * @see https://discordbotlist.com/api-docs
 */
export default class DiscordBotList extends ServiceBase {
  static get aliases() {
    return ['discordbotlist', 'discordbotlist.com', 'dbotlist']
  }

  static get logoURL() {
    return 'https://i.olsh.me/icon?size=1..100..500&url=discordbotlist.com'
  }

  static get serviceName() {
    return 'Discord Bot List'
  }

  static get websiteURL() {
    return 'https://discordbotlist.com'
  }

  static get baseURL() {
    return 'https://discordbotlist.com/api/v1'
  }

  /**
   * Posts statistics to this service.
   * @param options The options of the request
   */
  static post(options: ServiceBasePostOptions) {
    const {
      token,
      clientID,
      serverCount,
      shard,
      userCount,
      voiceConnections,
    } = options
    const data: AnyObject = { guilds: Util.resolveCount(serverCount) }
    if (shard) data.shard_id = shard.id
    if (userCount) data.users = Util.resolveCount(userCount)
    if (voiceConnections)
      data.voice_connections = Util.resolveCount(voiceConnections)

    return super._post({
      method: 'post',
      url: `/bots/${Util.resolveID(clientID)}/stats`,
      headers: { Authorization: `Bot ${token}` },
      data,
    })
  }
}
