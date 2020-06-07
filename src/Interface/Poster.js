const Constants = require('../Utils/Constants');
const EnsurePromise = require('../Utils/EnsurePromise');
const { Error: DBotsError, TypeError } = require('../Utils/DBotsError');
const ClientFiller = require('./ClientFiller');
const Service = require('./ServiceBase');
const allSettled = require('promise.allsettled');

/**
 * A class that posts server count to listing site(s).
 * @constructor
 * @param {PosterOptions} options The options needed to construct the poster
 */
class Poster {
  constructor(options) {
    if (!options || typeof options !== 'object')
      throw new DBotsError('INVALID_POSTER_OPTIONS');

    /**
     * The client that will be used to fetch the stats
     * @type {Object}
     */
    this.client = options.client;

    /**
     * The client filler used in the poster
     * @type {ClientFiller | null}
     * @private
     */
    this._clientFiller = null;

    /**
     * An array of custom services that the poster uses
     * @type {Array<CustomService>}
     */
    this.customServices = options.customServices || [];

    /**
     * The API keys that the poster is using
     * @type {Record<Service, string>}
     */
    this.apiKeys = options.apiKeys || {};

    /**
     * The options the poster was built with
     * @type {PosterOptions}
     * @readonly
     */
    this.options = options;

    if (typeof options.useSharding !== 'boolean')
      options.useSharding = true;
    if (!this.client && !options.clientID)
      throw new DBotsError('NO_CLIENT_OR_ID');
    if (this.client && !options.clientID) Object.assign(options, {
      clientID: this.clientFiller.clientID,
      shard: this.clientFiller.shard,
    });
    if (!options.useSharding) options.shard = undefined;

    /**
     * The list of event handlers for every custom event
     * @type {Record<CustomEvent, Array<eventHandler>>}
     */
    this.handlers = {};
    for (const event of Constants.SupportedEvents) this.handlers[event] = [];
  }

  /**
   * The client filler used in the poster
   * @private
   * @type {?ClientFiller}
   * @readonly
   */
  get clientFiller() {
    return this._clientFiller ||
      (this._clientFiller = ClientFiller.get(this.options.clientLibrary, this.client));
  }

  /**
    * Retrieves the current server count of the client/shard.
    * @returns {Promise<number>} Amount of servers the client/shard is in
    */
  getServerCount() {
    if (this.options.serverCount)
      return EnsurePromise(this.options.serverCount);
    if (!this.client)
      throw new DBotsError('NO_CLIENT', 'server');
    if (!this.options.serverCount && !this.options.clientLibrary)
      throw new DBotsError('UNKNOWN_CLIENT', 'server');
    return Promise.resolve(this.clientFiller.serverCount);
  }

  /**
    * Retrieves the current user count of the client/shard.
    * @returns {Promise<number>} Amount of users the client/shard is connected with
   */
  getUserCount() {
    if (this.options.userCount)
      return EnsurePromise(this.options.userCount);
    if (!this.client)
      throw new DBotsError('NO_CLIENT', 'user');
    if (!this.options.userCount && !this.options.clientLibrary)
      throw new DBotsError('UNKNOWN_CLIENT', 'user');
    return Promise.resolve(this.clientFiller.userCount);
  }

  /**
   * Retrieves the current voice connection count of the client/shard.
   * @returns {Promise<number>} Number of active voice connections
   */
  getVoiceConnections() {
    if (this.options.voiceConnections)
      return EnsurePromise(this.options.voiceConnections);
    if (!this.client)
      throw new DBotsError('NO_CLIENT', 'voice connection');
    if (!this.options.voiceConnections && !this.options.clientLibrary)
      throw new DBotsError('UNKNOWN_CLIENT', 'voice connection');
    return Promise.resolve(this.clientFiller.voiceConnections);
  }

  /**
    * Creates an interval that posts to all services.
    * @param {number} interval The time (in ms) to reach to post to all {@link Service}s again
    * @returns {NodeJS.Timeout} The interval that is responsible for posting
    */
  startInterval(interval = 1800000) {
    clearTimeout(this._interval);

    /**
     * Interval that posts to all services
     * @type {Timeout}
     * @private
     */
    this._interval = setInterval(() => this.post().then(result => {
      this.runHandlers('autopost', result);
      return result;
    }).catch(error => this.runHandlers('autopostfail', error)), interval);
    return this._interval;
  }

  /**
    * Destroys the current interval.
    */
  stopInterval() {
    if (this._interval) clearTimeout(this._interval);
  }

  /**
    * Gets a service, autofilling its API key if the poster has it.
    * @param {Service} service The service to get
    * @returns {?ServiceBase|CustomService}
    */
  getService(service) {
    const serviceClass = Service.get(service, this.customServices);
    if (!serviceClass) return null;
    if (!Object.prototype.isPrototypeOf.call(Service, serviceClass))
      return serviceClass;
    const keyName = serviceClass.aliases.find(key => Object.keys(this.apiKeys).includes(key));
    return new serviceClass(keyName ? this.apiKeys[keyName] : null);
  }

  /**
    * Posts the current clients server count to a service.
    * @param {Service|"all"} [service] The service to post to
    * @see Poster#postManual
    * @returns {Promise<Object|Array<Object>>} The result(s) of the post
    */
  post(service) {
    const _this = this;
    return new Promise((resolve, reject) => {
      return Promise.all([_this.getServerCount(), _this.getUserCount(), _this.getVoiceConnections()])
        .then(([serverCount, userCount, voiceConnections]) => {
          _this.postManual(service, { serverCount, userCount, voiceConnections })
            .then(resolve).catch(reject);
        }).catch(reject);
    });
  }

  /**
    * Manually posts a server count to a service.
    * @param {Service|"all"} service The service to post to
    * @param {Object} counts An object containing the tallies of servers, users and voice connections
    * @param {number} counts.serverCount The server count to post to the service
    * @param {number} [counts.userCount] The user count to post to the service
    * @param {number} [counts.voiceConnections] The voice connection count to post to the service
    * @returns {Promise<Object|Array<Object>>} The result(s) of the post
    */
  postManual(service, { serverCount, userCount, voiceConnections } = {}) {
    if (!service) service = 'all';
    if (!this.apiKeys && !this.options.post)
      return Promise.reject(new DBotsError('NO_API_KEYS'));
    if (service === 'custom')
      return EnsurePromise(this.options.post, this.options.clientID, serverCount, this.options.shard);
    if (!service || service === 'all') {
      const services = Object.keys(this.apiKeys);
      if (this.options.post) services.push('custom');
      return allSettled(services.map(k => this.postManual(k, { serverCount, userCount, voiceConnections })))
        .then(requests => {
          const rejected = [],
            hostnames = [];

          for (const r of requests) {
            if (r.status == 'rejected') {
              rejected.push(r);
              if (r.reason && r.reason.config && r.reason.config.url) {
                const hostname = new URL(r.reason.config.url).hostname;
                if (hostname && !hostnames.includes(hostname))
                  hostnames.push(hostname);
              } else hostnames.push('???');
            }
          }

          if (rejected.length > 0) {
            let msg = `${rejected.length} request${rejected.length == 1 ? '' : 's'} have been rejected.\n`;
            if (hostnames.length > 0) msg += `Failing hostnames: ${hostnames.join(', ')}\n`;
            msg += 'Please check the error from the following responses.\n';
            msg += rejected.map(rej => {
              const reason = rej.reason || rej;
              return (reason && typeof reason == 'object' && !(reason instanceof Error)) ? 
                JSON.stringify(reason, null, 2) :
                reason.toString();
            }).join('\n');
            throw new DBotsError('GENERIC', msg);
          } else return requests.map(r => r.value);
        });
    }
    if (!Object.keys(this.apiKeys).includes(service))
      return Promise.reject(new DBotsError('SERVICE_WITH_NO_KEY', service));
    const serviceClass = Service.get(service, this.customServices);
    if (!serviceClass)
      return Promise.reject(new TypeError('INVALID_SERVICE', service));
    return new Promise((resolve, reject) => {
      serviceClass.post({
        token: this.apiKeys[service],
        clientID: this.options.clientID,
        shard: this.options.shard,
        serverCount,
        userCount,
        voiceConnections
      }).then(result => {
        this.runHandlers('post', result);
        resolve(result);
      }).catch(error => {
        this.runHandlers('postfail', error);
        reject(error);
      });
    });
  }

  /**
   * Adds an handler for an event.
   * @param {CustomEvent} event The name of the event to add the handler to
   * @param {eventHandler} handler The function that is run with the event
   * @returns {Array<eventHandler>} The array of handlers currently set for that event
   */
  addHandler(event, handler) {
    if (!Constants.SupportedEvents.includes(event))
      throw new TypeError('UNSUPPORTED_EVENT', 'add');
    if (!(handler instanceof Function || handler instanceof Promise))
      throw new DBotsError('HANDLER_INVALID');
    return this.handlers[event].push(handler);
  }

  /**
   * Removes an handler for an event.
   * @param {CustomEvent} event The name of the event to remove the handler from
   * @param {eventHandler} handler The function that is run with the event
   * @returns {Array<eventHandler>} The array of handlers currently set for that event
   */
  removeHandler(event, handler) {
    if (!Constants.SupportedEvents.includes(event))
      throw new TypeError('UNSUPPORTED_EVENT', 'remove');
    if (!(handler instanceof Function || handler instanceof Promise))
      throw new DBotsError('HANDLER_INVALID');
    const index = this.handlers[event].indexOf(handler);
    if (index >= 0) this.handlers[event].splice(index, 1);
    return this.handlers[event];
  }

  /**
   * Manually triggers an event with custom arguments.
   * @param {CustomEvent} event The name of the event to run the handlers for
   * @param  {...any} args The arguments to pass to the handlers
   */
  runHandlers(event, ...args) {
    if (!Constants.SupportedEvents.includes(event))
      throw new TypeError('UNSUPPORTED_EVENT', 'run');
    for (const handler of this.handlers[event]) EnsurePromise(handler(...args));
  }
}

module.exports = Poster;
