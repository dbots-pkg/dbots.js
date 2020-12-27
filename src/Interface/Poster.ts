import {
  CustomEvent,
  CustomService,
  eventHandler,
  PosterOptions,
  ServiceKey,
  SupportedEvents
} from '../Utils/Constants'
import EnsurePromise from '../Utils/EnsurePromise'
import { errors } from '../Utils/DBotsError'
import { ClientFiller, getClientFiller } from './ClientFiller'
import Service from './Service'
import allSettled, { PromiseRejection } from 'promise.allsettled'

const { Error: DBotsError, TypeError } = errors

export interface manualPostOptions {
  /** The server count to post to the service */
  serverCount: number

  /** The user count to post to the service */
  userCount?: number

  /** The voice connection count to post to the service */
  voiceConnections?: number
}

/** A class that posts server count to listing site(s). */
export default class Poster {
  // #region Properties
  /** The client that will be used to fetch the stats */
  client: PosterOptions['client']

  /** An array of custom services that the poster uses */
  customServices: CustomService[]

  /** The API keys that the poster is using */
  apiKeys: Record<ServiceKey, string>

  /** The options the poster was built with */
  readonly options: PosterOptions

  /** The list of event handlers for every custom event */
  handlers: Record<CustomEvent, eventHandler[]>

  /** The client filler used in the poster */
  private _clientFiller: ClientFiller | null

  /** Interval that posts to all services */
  private _interval?: number // eslint-disable-line no-undef
  // #endregion

  /**
   * @constructor
   * @param options The options needed to construct the poster
   */
  constructor(options: PosterOptions) {
    if (!options || typeof options !== 'object')
      throw new DBotsError('INVALID_POSTER_OPTIONS')

    this.client = options.client

    this._clientFiller = null

    this.customServices = options.customServices || []

    this.apiKeys = options.apiKeys || {}

    this.options = options

    if (typeof options.useSharding !== 'boolean') options.useSharding = true
    if (!this.client && !options.clientID)
      throw new DBotsError('NO_CLIENT_OR_ID')
    if (this.client && !options.clientID)
      Object.assign(options, {
        clientID: this.clientFiller?.clientID,
        shard: this.clientFiller?.shard
      })
    if (!options.useSharding) options.shard = undefined

    this.handlers = {} as Record<CustomEvent, eventHandler[]>
    for (const event of SupportedEvents) this.handlers[event] = []
  }

  /** The client filler used in the poster */
  private get clientFiller(): ClientFiller | undefined {
    return (
      this._clientFiller ||
      (this.options.clientLibrary && this.client
        ? (this._clientFiller = getClientFiller(
            this.options.clientLibrary,
            this.client
          ))
        : undefined)
    )
  }

  /**
   * Retrieves the current server count of the client/shard.
   * @returns Amount of servers the client/shard is in
   */
  getServerCount(): Promise<number> {
    if (this.options.serverCount)
      // @ts-expect-error
      return EnsurePromise(this.options.serverCount)

    if (!this.client) throw new DBotsError('NO_CLIENT', 'server')
    if (!this.options.clientLibrary)
      throw new DBotsError('UNKNOWN_CLIENT', 'server')

    return Promise.resolve(this.clientFiller?.serverCount || 0)
  }

  /**
   * Retrieves the current user count of the client/shard.
   * @returns Amount of users the client/shard is connected with
   */
  getUserCount(): Promise<number> {
    if (this.options.userCount)
      // @ts-expect-error
      return EnsurePromise(this.options.userCount) as Promise<number>

    if (!this.client) throw new DBotsError('NO_CLIENT', 'user')
    if (!this.options.clientLibrary)
      throw new DBotsError('UNKNOWN_CLIENT', 'user')

    return Promise.resolve(this.clientFiller?.userCount || 0)
  }

  /**
   * Retrieves the current voice connection count of the client/shard.
   * @returns Number of active voice connections
   */
  getVoiceConnections(): Promise<number> {
    if (this.options.voiceConnections)
      // @ts-expect-error
      return EnsurePromise(this.options.voiceConnections) as Promise<number>

    if (!this.client) throw new DBotsError('NO_CLIENT', 'voice connection')
    if (!this.options.clientLibrary)
      throw new DBotsError('UNKNOWN_CLIENT', 'voice connection')

    return Promise.resolve(this.clientFiller?.voiceConnections || 0)
  }

  /**
   * Creates an interval that posts to all services.
   * @param interval The time (in ms) to reach to post to all {@link Service}s again
   * @returns The interval that is responsible for posting
   * @emits Poster#autopostSuccess
   * @emits Poster#autopostFail
   */
  startInterval(interval = 1800000) {
    this._interval && clearTimeout(this._interval)

    this._interval = (setInterval(
      () =>
        this.post()
          .then((result) => {
            this.runHandlers('autopostSuccess', result)
            return result
          })
          .catch((error) => this.runHandlers('autopostFail', error)),
      interval
    ) as unknown) as number
    return this._interval
  }

  /** Destroys the current interval. */
  stopInterval() {
    if (this._interval) clearTimeout(this._interval)
  }

  /**
   * Gets a service, autofilling its API key if the poster has it.
   * @param service The service to get
   */
  getService(
    service: ServiceKey
  ): (Service | CustomService) | typeof Service | undefined {
    const serviceClass = Service.get(service, this.customServices)

    if (!serviceClass) return undefined

    const keyName = serviceClass.aliases.find((key: string) =>
      Object.keys(this.apiKeys).includes(key)
    )
    if (keyName) return new serviceClass(this.apiKeys[keyName])
    else return serviceClass
  }

  /**
   * Posts the current clients server count to a service.
   * @param service The service to post to
   * @see Poster#postManual
   * @returns The result(s) of the post
   * @emits Poster#postSuccess
   * @emits Poster#postFail
   */
  post(service: ServiceKey | 'all' = 'all'): Promise<object | object[]> {
    const _this = this
    return new Promise((resolve, reject) => {
      return Promise.all([
        _this.getServerCount(),
        _this.getUserCount(),
        _this.getVoiceConnections()
      ])
        .then(([serverCount, userCount, voiceConnections]) => {
          _this
            .postManual(service, { serverCount, userCount, voiceConnections })
            .then(resolve)
            .catch(reject)
        })
        .catch(reject)
    })
  }

  /**
   * Manually posts a server count to a service.
   * @param service The service to post to
   * @param counts An object containing the tallies of servers, users and voice connections
   * @returns The result(s) of the post
   */
  postManual(
    service: ServiceKey | 'all',
    counts: manualPostOptions
  ): Promise<object | object[]> {
    const { serverCount, userCount, voiceConnections } = counts

    if (!service) service = 'all'

    if (!this.apiKeys && !this.options.post)
      return Promise.reject(new DBotsError('NO_API_KEYS'))

    if (service === 'custom')
      // @ts-expect-error
      return EnsurePromise(
        // @ts-expect-error
        this.options.post,
        this.options.clientID,
        serverCount,
        this.options.shard
      )

    if (service === 'all') {
      const services = Object.keys(this.apiKeys)
      if (this.options.post) services.push('custom')
      return allSettled
        .call(
          Promise,
          services.map((k) =>
            this.postManual(k, { serverCount, userCount, voiceConnections })
          )
        )
        .then((requests) => {
          const rejected: PromiseRejection<any>[] = [],
            hostnames: string[] = []

          for (const r of requests) {
            if (r.status == 'rejected') {
              rejected.push(r)
              // @ts-expect-error
              if (r.reason?.config?.url) {
                // @ts-expect-error
                const hostname = new URL(r.reason.config.url).hostname
                if (hostname && !hostnames.includes(hostname))
                  hostnames.push(hostname)
              } else hostnames.push('???')
            }
          }

          if (rejected.length > 0) {
            let msg = `${rejected.length} request${
              rejected.length == 1 ? '' : 's'
            } have been rejected.\n`
            if (hostnames.length > 0)
              msg += `Failing hostnames: ${hostnames.join(', ')}\n`
            msg += 'Please check the error from the following responses.\n'
            msg += rejected
              .map((rej) => {
                const reason = rej.reason || rej
                return reason &&
                  typeof reason == 'object' &&
                  !(reason instanceof Error)
                  ? JSON.stringify(reason, null, 2)
                  : reason.toString()
              })
              .join('\n')
            throw new DBotsError('GENERIC', msg)
          } else {
            // @ts-expect-error
            return requests.map((r) => r.value)
          }
        })
    }

    if (!Object.keys(this.apiKeys).includes(service))
      return Promise.reject(new DBotsError('SERVICE_NO_KEY', service))

    const serviceClass = Service.get(service, this.customServices)
    if (!serviceClass)
      return Promise.reject(new TypeError('INVALID_SERVICE', service))

    return new Promise((resolve, reject) => {
      serviceClass
        .post({
          token: this.apiKeys[service],
          clientID: this.options.clientID || '',
          shard: this.options.shard,
          serverCount,
          userCount,
          voiceConnections
        })
        .then((result) => {
          this.runHandlers('postSuccess', result)
          resolve(result)
        })
        .catch((error) => {
          this.runHandlers('postFail', error)
          reject(error)
        })
    })
  }

  /**
   * Adds an handler for an event.
   * @param event The name of the event to add the handler to
   * @param handler The function that is run with the event
   * @returns The array of handlers currently set for that event
   */
  addHandler(event: CustomEvent, handler: eventHandler): eventHandler[] {
    if (!SupportedEvents.includes(event))
      throw new TypeError('UNSUPPORTED_EVENT', 'add')
    if (typeof handler != 'function') throw new DBotsError('HANDLER_INVALID')

    this.handlers[event].push(handler)
    return this.handlers[event]
  }

  /**
   * Removes an handler for an event.
   * @param event The name of the event to remove the handler from
   * @param handler The function that is run with the event
   * @returns The array of handlers currently set for that event
   */
  removeHandler(event: CustomEvent, handler: eventHandler): eventHandler[] {
    if (!SupportedEvents.includes(event))
      throw new TypeError('UNSUPPORTED_EVENT', 'remove')
    if (typeof handler != 'function') throw new DBotsError('HANDLER_INVALID')

    const index = this.handlers[event].indexOf(handler)
    if (index >= 0) this.handlers[event].splice(index, 1)
    return this.handlers[event]
  }

  /**
   * Manually triggers an event with custom arguments.
   * @param {CustomEvent} event The name of the event to run the handlers for
   * @param  {...any} args The arguments to pass to the handlers
   */
  runHandlers(event: CustomEvent, ...args: any[]) {
    if (!SupportedEvents.includes(event))
      throw new TypeError('UNSUPPORTED_EVENT', 'run')

    for (const handler of this.handlers[event]) EnsurePromise(handler, ...args)
  }
}
