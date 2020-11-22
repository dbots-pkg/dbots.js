import ServiceBase, { ServiceBasePostOptions } from '../ServiceBase'
import Util from '../../Utils/Util'

/**
 * Represents the Arcane Bot Center service.
 * @see https://arcane-center.xyz/documentation
 */
export default class Arcane extends ServiceBase {
  static get aliases() {
    return [
      'arcanebotcenter',
      'arcane-botcenter.xyz',
      'arcanebotcenter.xyz',
      'arcane',
      'abc',
      'arcane-center.xyz',
      'arcanecenter.xyz',
    ]
  }

  static get logoURL() {
    return 'https://i.olsh.me/icon?size=1..100..500&url=arcane-botcenter.xyz'
  }

  static get serviceName() {
    return 'Arcane Bot List'
  }

  static get websiteURL() {
    return 'https://arcane-center.xyz'
  }

  static get baseURL() {
    return 'https://arcane-center.xyz/api'
  }

  /**
   * Posts statistics to this service.
   * @param options The options of the request
   */
  static post(options: ServiceBasePostOptions) {
    const { token, clientID, serverCount, userCount, shard } = options
    return super._post({
      method: 'post',
      url: `/${Util.resolveID(clientID)}/stats`,
      headers: { Authorization: token },
      data: shard
        ? {
            server_count: Util.resolveCount(serverCount),
            member_count: Util.resolveCount(userCount),
            shard_count: shard.count,
          }
        : {
            server_count: Util.resolveCount(serverCount),
            member_count: Util.resolveCount(userCount),
          },
    })
  }
}
