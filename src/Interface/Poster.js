const Constants = require('../Utils/Constants');
const EnsurePromise = require('../Utils/EnsurePromise');
const ClientFiller = require('./ClientFiller');
const Service = require('./ServiceBase');

/**
 * A class that posts server count to listing site(s).
 * @constructor
 * @param {PosterOptions} options The options needed to construct the poster.
 */
class Poster {
  constructor(options) {
    if (!options || typeof options !== 'object') 
      throw new Error('An object is required a parameter to construct a poster.');

    /**
     * The client that will be used to fecth the stats.
     * @type {Object}
     */
    this.client = options.client;
    this._clientFiller = null;

    /**
     * The options the poster was built with.
     * @type {PosterOptions}
     * @readonly
     */
    this.options = options;

    if (typeof options.useSharding !== 'boolean')
      options.useSharding = true;
    if (!this.client && !options.clientID) 
      throw new Error('clientID must be defined when client is non-existant.');
    if (this.client && !options.clientID) Object.assign(options, {
      clientID: this.clientFiller.clientID,
      shard: this.clientFiller.shard,
    });
    if (!options.useSharding) options.shard = undefined;

    /**
     * The list of event handlers for every custom event.
     * @type {Object.<CustomEvent, Array<PromiseResolvable>>}
     */
    this.handlers = {};
    for (const event of Constants.SupportedEvents) this.handlers[event] = [];
  }


  /**
   * The client filler used in the poster
   * @private
   * @type {?ClientFiller}
   */
  get clientFiller() {
    return this._clientFiller ||
      (this._clientFiller = ClientFiller.get(this.options.clientLibrary, this.client));
  }

  /**
    * Retrieves the current server count of the client/shard
    * @returns {Promise<number>} Amount of servers the client/shard is in
    */
  getServerCount() {
    if (this.options.serverCount)
      return EnsurePromise(this.options.serverCount);
    if (!this.client)
      throw new Error('Cannot retrieve server count from non-existant client');
    if (!this.options.serverCount && !this.options.clientLibrary) 
      throw new Error('Cannot retrieve server count from unknown client');
    return Promise.resolve(this.clientFiller.serverCount);
  }

  /**
    * Retrieves the current user count of the client/shard
    * @returns {Promise<number>} Amount of users the client/shard is connected with
   */
  getUserCount() {
    if (this.options.userCount)
      return EnsurePromise(this.options.userCount);
    if (!this.client)
      throw new Error('Cannot retrieve user count from non-existant client');
    if (!this.options.userCount && !this.options.clientLibrary) 
      throw new Error('Cannot retrieve user count from unknown client');
    return Promise.resolve(this.clientFiller.userCount);
  }

  /**
   * Retrieves the current voice connection count of the client/shard
   * @returns {Promise<number>} Number of active voice connections
   */
  getVoiceConnections() {
    if (this.options.voiceConnections)
      return EnsurePromise(this.options.voiceConnections);
    if (!this.client)
      throw new Error('Cannot retrieve voice connection count from non-existant client');
    if (!this.options.voiceConnections && !this.options.clientLibrary) 
      throw new Error('Cannot retrieve voice connection count from unknown client');
    return Promise.resolve(this.clientFiller.voiceConnections);
  }

  /**
    * Creates an interval that posts to all services
    * @param {number} interval The time (in ms) to reach to post to all {@link Service}s again.
    * @returns {Interval} The interval that is responsible for posting
    */
  startInterval(interval = 1800000) {
    clearTimeout(this._interval);
    this._interval = setInterval(() => this.post().then(result => {
      this.runHandlers('autopost', result);
      return result;
    }).catch(error => this.runHandlers('autopostfail', error)), interval);
    return this._interval;
  }

  /**
    * Destroys the current interval
    */
  stopInterval() {
    if (this._interval) clearTimeout(this._interval);
  }

  /**
    * Posts the current clients server count to a service
    * @see Poster#postManual
    */
  post(service) {
    const _this = this;
    return new Promise((resolve, reject) => {
      return Promise.all([_this.getServerCount(), _this.getUserCount(), _this.getVoiceConnections()])
        .then(([serverCount, userCount, voiceConnections]) => {
          _this.postManual(serverCount, service, userCount, voiceConnections)
            .then(resolve).catch(reject);
        }).catch(reject);
    });
  }

  /**
    * Manually posts a server count to a service
    * @param {number} serverCount The server count to post to the service
    * @param {Service} service The service to post to
    * @param {number} [userCount] The server count to post to the service
    * @param {number} [voiceConnections] The voice connection count to post to the service
    * @returns {Promise<Object|Array<Object>>} The result(s) of the post
    */
  postManual(serverCount, service = 'all', userCount = undefined, voiceConnections = undefined) {
    if (!this.options.apiKeys && !this.options.post)
      return Promise.reject(new Error('NO_API_KEYS'));
    if (service === 'custom') 
      return EnsurePromise(this.options.post, this.options.clientID, serverCount, this.options.shard);
    if (!service || service === 'all') {
      const services = Object.keys(this.options.apiKeys);
      if (this.options.post) services.push('custom');
      return Promise.all(services.map(k => this.postManual(serverCount, k)));
    }
    if (!Object.keys(this.options.apiKeys).includes(service))
      return Promise.reject(new Error('SERVICE_WITH_NO_KEY', service));
    const serviceClass = Service.get(service);
    if (!serviceClass)
      return Promise.reject(new Error('INVALID_SERVICE', service));
    return new Promise((resolve, reject) => {
      serviceClass.post({
        token: this.options.apiKeys[service],
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
   * Adds an handler for an event
   * @param {CustomEvent} event The name of the event to add the handler to
   * @param {PromiseResolvable} handler The function that is run with the event
   * @returns {Array<PromiseResolvable>} The array of handlers currently set for that event
   */
  addHandler(event, handler) {
    if (!Constants.SupportedEvents.includes(event)) 
      throw new Error('Can\'t add handler for an unsupported event.');
    if (!(handler instanceof Function || handler instanceof Promise)) 
      throw new Error('Given handler is not a PromiseResolvable.');
    return this.handlers[event].push(handler);
  }

  /**
   * Removes an handler for an event
   * @param {CustomEvent} event The name of the event to remove the handler from
   * @param {PromiseResolvable} handler The function that is run with the event
   * @returns {Array<PromiseResolvable>} The array of handlers currently set for that event
   */
  removeHandler(event, handler) {
    if (!Constants.SupportedEvents.includes(event)) 
      throw new Error('Can\'t remove handler for an unsupported event.');
    if (!(handler instanceof Function || handler instanceof Promise)) 
      throw new Error('Given handler is not a PromiseResolvable.');
    const index = this.handlers[event].indexOf(handler);
    if (index >= 0) this.handlers[event].splice(index, 1);
    return this.handlers[event];
  }

  /**
   * Manually triggers an event with custom arguments
   * @param {CustomEvent} event The name of the event to run the handlers for
   * @param  {...any} args The arguments to pass to the handlers
   */
  runHandlers(event, ...args) {
    if (!Constants.SupportedEvents.includes(event)) 
      throw new Error('Can\'t remove handler for an unsupported event.');
    for (const handler of this.handlers[event]) EnsurePromise(handler(...args));
  }
}

module.exports = Poster;
