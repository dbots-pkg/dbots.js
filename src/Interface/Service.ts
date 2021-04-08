import { formatRequest, RequestForm } from '../Utils/FormatRequest'
import { errors } from '../Utils/DBotsError'
const { Error } = errors

// @ts-expect-error
import buildURL from 'axios/lib/helpers/buildURL'
import { CustomService, Query, Shard } from '../Utils/Constants'
import { assert, CountResolvable, IDResolvable } from '../Utils/Util'
import { serviceList } from './ListIndex'

/** Options provided when sending a service request */
export interface ServiceRequestOptions {
  /** Whether the request requires a token */
  requiresToken?: boolean

  /** Whether to prepend the service's base API url */
  appendBaseURL?: boolean
}

/** Options provided when posting to a service */
export interface ServicePostOptions {
  /** The Authorization token for the request */
  token: string

  /** The client ID that the request will post for */
  clientID: IDResolvable

  /** The amount of servers that the client is in */
  serverCount: CountResolvable

  /** The amount of users that the client cached */
  userCount: CountResolvable

  /** The number of voice connections */
  voiceConnections?: CountResolvable

  /** The shard the request is representing */
  shard?: Shard
}

/** Represents a basic service. */
export class Service {
  /**
   * The token that will be used for the service.
   * @private
   */
  token: string

  /**
   * @param token The token/key for the service
   */
  constructor(token: string) {
    this.token = token
  }

  /** The base URL of the service's API. */
  static get baseURL() {
    return ''
  }

  /**
   * Gets a service from a key.
   * @param key The name of the service to get
   * @param extras An array of {@link CustomService}s to include
   */
  static get(key: string, extras?: CustomService[]): typeof Service | null
  static get<T extends keyof typeof serviceList>(
    key: T,
    extras?: CustomService[]
  ): typeof serviceList[T]
  static get(key: string, extras: CustomService[] = []): typeof Service | null {
    if (!key || typeof key !== 'string') return null

    const services = [...Object.values(serviceClasses), ...extras]

    for (const service of services) {
      if (!service || !service.aliases || !service.post) continue

      if (service.aliases.includes(key.toLowerCase())) return service
    }
    return null
  }

  /** Gets every loaded service. */
  static getAll() {
    return serviceClasses
  }

  /**
   * Posts statistics to this service.
   * Internally, this is supposed to be used in extended classes.
   * @param form The request form
   * @param appendBaseURL Whether to append the service's base API url
   * @private
   */
  static _post(form: RequestForm, appendBaseURL = true) {
    try {
      this.serviceName
    } catch {
      return Promise.reject(new Error('CALLED_FROM_BASE'))
    }

    if (this.baseURL && appendBaseURL) form.url = this.baseURL + form.url
    return formatRequest(form)
  }

  /**
   * Sends a request for the service interface.
   * @param form The request form
   * @param options The options of this request
   * @private
   */
  _request(form: RequestForm, options: ServiceRequestOptions = {}) {
    const { requiresToken = false, appendBaseURL = true } = options

    if (requiresToken && !this.token)
      return Promise.reject(new Error('REQUIRES_TOKEN'))

    assert<typeof Service>(this.constructor)
    return formatRequest({
      ...form,
      url:
        (this.constructor.baseURL && appendBaseURL
          ? this.constructor.baseURL
          : '') + form.url
    })
  }

  /**
   * Appends query string to a URL.
   * @param url The URL to modify
   * @param query The query to append
   * @param appendBaseURL Whether to prepend the service's base API url
   * @returns The modified URL
   * @private
   */
  _appendQuery(url: string, query: Query, appendBaseURL = true): string {
    assert<typeof Service>(this.constructor)

    if (this.constructor.baseURL && appendBaseURL)
      url = this.constructor.baseURL + url
    return buildURL(url, query)
  }

  /** The values that can be used to select the service. */
  static get aliases(): string[] {
    throw 'This is just a placeholder prop, it should not be accessed'
  }

  /**
   * The logo URL, used only for documentation.
   * @private
   */
  static get logoURL(): string {
    throw 'This is just a placeholder prop, it should not be accessed'
  }

  /**
   * Service's name, used only for documentation.
   * @private
   */
  static get serviceName(): string {
    throw 'This is just a placeholder prop, it should not be accessed'
  }

  /**
   * The website URL, used only for documentation.
   * @private
   */
  static get websiteURL(): string {
    throw 'This is just a placeholder prop, it should not be accessed'
  }

  static post(
    options: ServicePostOptions // eslint-disable-line @typescript-eslint/no-unused-vars
  ): ReturnType<typeof Service['_post']> {
    throw 'This is just a placeholder method, it should not be called'
  }
}

// Service loading
let serviceClasses: Record<string, typeof Service> = {}
const usingNode =
  typeof process != 'undefined' && process.release.name == 'node'
if (!usingNode) {
  serviceClasses = require('../../.tmp/services-list')
} else {
  const path = eval('require')('path')
  const fs = eval('require')('fs')

  const listsDir = path.join(__dirname, './Lists')
  fs.readdirSync(listsDir).forEach((fileName: string) => {
    if (fileName.endsWith('.d.ts')) return

    const listClass = require(path.join(listsDir, fileName)).default
    if (listClass) serviceClasses[path.parse(fileName).name] = listClass
  })
}
