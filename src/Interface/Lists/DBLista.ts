import ServiceBase from '../ServiceBase'
import { errors } from '../../Utils/DBotsError'
import Util, {
  AnyObject,
  CountResolvable,
  IDResolvable
} from '../../Utils/Util'

const { Error } = errors

/**
 * Represents the DBLista service.
 * @see https://docs.dblista.pl/
 */
export default class DBLista extends ServiceBase {
  static get aliases() {
    return ['dblistapl', 'dblista.pl', 'dblista']
  }

  static get logoURL() {
    return 'https://i.olsh.me/icon?size=1..100..500&url=dblista.pl'
  }

  static get serviceName() {
    return 'DBLista'
  }

  static get websiteURL() {
    return 'https://dblista.pl'
  }

  static get baseURL() {
    return 'https://api.dblista.pl/v1'
  }

  /**
   * <warn>This service does not support posting.
   * This function is defined to properly return an error if improperly used to post.</warn>
   * @private
   */
  static post() {
    return Promise.reject(new Error('POSTING_UNSUPPORTED', this.name))
  }

  /**
   * Adds a bot to the service.
   * @param data The data being posted. This should include the ID of the bot
   */
  addBot(data: AnyObject) {
    return this._request(
      {
        method: 'post',
        url: '/bots',
        headers: { Authorization: this.token },
        data
      },
      {
        requiresToken: true
      }
    )
  }

  /**
   * Updates the bot's listing with the data provided.
   * @param data The data being posted. This should include the ID of the bot
   */
  updateBot(data: AnyObject) {
    return this._request(
      {
        method: 'put',
        url: '/bots',
        headers: { Authorization: this.token },
        data
      },
      {
        requiresToken: true
      }
    )
  }

  /**
   * Gets the bot listed on this service.
   * @param id The bot's ID
   */
  getBot(id: IDResolvable) {
    return this._request({ url: `/bots/${Util.resolveID(id)}` })
  }

  /**
   * Gets a list of bots on this service.
   * @param page The page you want to get
   */
  getBots(page: CountResolvable = 0) {
    return this._request({ url: `/bots/list/${Util.resolveCount(page)}` })
  }

  /** Gets a list of unverified bots on this service. */
  getUnverifiedBots() {
    return this._request({ url: '/bots/list/unverified' })
  }

  /** Gets a list of rejected bots on this service. */
  getRejectedBots() {
    return this._request({ url: '/bots/list/rejected' })
  }

  /**
   * Adds a rating to a bot on the service.
   * @param id The bot's ID
   * @param data The data being posted
   */
  rateBot(id: IDResolvable, data: AnyObject) {
    return this._request(
      {
        method: 'post',
        url: `/bots/${Util.resolveID(id)}/rate`,
        headers: { Authorization: this.token },
        data
      },
      {
        requiresToken: true
      }
    )
  }

  /**
   * Removes a rating from a bot on the service.
   * @param id The bot's ID
   */
  removeRating(id: IDResolvable) {
    return this._request(
      {
        method: 'delete',
        url: `/bots/${Util.resolveID(id)}/rate`,
        headers: { Authorization: this.token }
      },
      {
        requiresToken: true
      }
    )
  }

  /**
   * Removes a bot from the service.
   * @param id The bot's ID
   */
  removeBot(id: IDResolvable) {
    return this._request(
      {
        method: 'delete',
        url: `/bots/${Util.resolveID(id)}`,
        headers: { Authorization: this.token }
      },
      {
        requiresToken: true
      }
    )
  }

  /**
   * Searches for bots on the service.
   * @param query The query to search for
   */
  search(query: string) {
    return this._request({ url: `/bots/search/${encodeURIComponent(query)}` })
  }
}
