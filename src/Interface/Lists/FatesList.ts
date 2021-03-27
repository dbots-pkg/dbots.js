import { Service, ServicePostOptions } from '../Service'
import { Util, IDResolvable } from '../../Utils/Util'

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
}
