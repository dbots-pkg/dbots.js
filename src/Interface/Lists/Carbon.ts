import ServiceBase, { ServiceBasePostOptions } from '../ServiceBase'
import Util from '../../Utils/Util'

/**
 * Represents the Carbonitex service.
 */
export default class Carbon extends ServiceBase {
  static get aliases() {
    return ['carbonitex', 'carbonitex.net', 'carbon']
  }

  static get logoURL() {
    return 'https://get.snaz.in/7N8ywwr.png'
  }

  static get serviceName() {
    return 'Carbonitex'
  }

  static get websiteURL() {
    return 'https://www.carbonitex.net/Discord/bots'
  }

  static get baseURL() {
    return 'https://www.carbonitex.net/discord'
  }

  /**
   * Posts statistics to this service.
   * <warn>Shard data posting is not supported for this service.</warn>
   * @param options The options of the request
   */
  static post(options: ServiceBasePostOptions) {
    const { token, serverCount } = options
    return super._post({
      method: 'post',
      url: '/data/botdata.php',
      data: { key: token, servercount: Util.resolveCount(serverCount) },
    })
  }

  /** Gets a list of bots on this service. */
  getBots() {
    return this._request({ url: '/api/listedbots' })
  }
}
