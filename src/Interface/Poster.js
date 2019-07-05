const Constants = require('../Utils/Constants');
const EnsurePromise = require('../Utils/EnsurePromise');
const FormatRequest = require('../Utils/FormatRequest');

/**
 * A class that posts server count to listing site(s).
 * @constructor
 * @param {PosterOptions} options The options needed to construct the poster.
 */
class Poster {
  constructor(options) {
    if (!options || typeof options !== 'object') throw new Error("An object is required a parameter to construct a poster.");
    this.client = options.client;
    if (typeof options.useSharding !== 'boolean') options.useSharding = true;
    if (!this.client && !options.clientID) throw new Error("clientID must be defined when client is non-existant.");
    if (this.client && !options.clientID) Object.assign(options, Constants.AutoValueFunctions[options.clientLibrary](options.client));
    if (!options.useSharding) options.shard = undefined;
    this.options = options;
  }

  /**
    * Retrieves the current server count of the client/shard
    * @returns {Promise<Number>} Amount of servers the client/shard is in
    */
  getServerCount() {
    if (!this.client) throw new Error('Cannot retrieve server count from non-existant client');
    if (this.options.serverCount && !this.options.clientLibrary) return EnsurePromise(this.options.serverCount);
    if (!this.options.serverCount && !this.options.clientLibrary) throw new Error('Cannot retrieve server count from unknown client');
    return EnsurePromise(Constants.ServerCountFunctions[this.options.clientLibrary], this.client);
  }

  /**
    * Retrieves the current user count of the client/shard
    * @returns {Promise<Number>} Amount of users the client/shard is connected with
   */
  getUserCount() {
    if (!this.client) throw new Error('Cannot retrieve user count from non-existant client');
    if (this.options.userCount && !this.options.clientLibrary) return EnsurePromise(this.options.userCount);
    if (!this.options.userCount && !this.options.clientLibrary) throw new Error('Cannot retrieve user count from unknown client');
    return EnsurePromise(Constants.UserCountFunctions[this.options.clientLibrary], this.client);
  }

  /**
   * Retrieves the current voice connection count of the client/shard
   * @returns {Promise<Number>} Number of active voice connections
   */
  getVoiceConnections() {
    if (!this.client) throw new Error('Cannot retrieve voice connection count from non-existant client');
    if (this.options.voiceConnections && !this.options.clientLibrary) return EnsurePromise(this.options.voiceConnections);
    if (!this.options.voiceConnections && !this.options.clientLibrary) throw new Error('Cannot retrieve voice connection count from unknown client');
    return EnsurePromise(Constants.VoiceConnectionsFunctions[this.options.clientLibrary], this.client);
  }

  /**
    * Creates an interval that posts to all services
    * @param {number} interval The time (in ms) to reach to post to all {link Service}s again.
    * @returns {Interval} The interval that is responsible for posting
    */
  startInterval(interval = 1800000) {
    clearTimeout(this._interval);
    this._interval = setInterval(() => this.post(), interval);
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
    * @see DBotsPoster#postManual
    */
  post(service) {
    let _this = this
    return new Promise((resolve, reject) => {
      _this.getServerCount().then(serverCount => {
        if ([undefined, 'all', 'custom', 'discordbotlist'].includes(service))
          return Promise.all([_this.getUserCount(), _this.getVoiceConnections()])
            .then(([userCount, voiceConnections]) => {
              resolve(_this.postManual(serverCount, service, userCount, voiceConnections))
            });
        else return _this.postManual(serverCount, service);
      }).then(resolve).catch(reject);
    })
  }

  /**
    * Manually posts a server count to a service
    * @param {Number} serverCount The server count to post to the service
    * @param {Service} service The service to post to
    * @param {Number} [userCount] The server count to post to the service
    * @param {Number} [voiceConnections] The voice connection count to post to the service
    * @returns {Promise<Object|Array<Object>>} The result(s) of the post
    */
  postManual(serverCount, service = 'all', userCount = undefined, voiceConnections = undefined) {
    if (!this.options.apiKeys && !this.options.post) throw new Error('NO_API_KEYS');
    if (!this.options.apiKeys || service === 'custom') return EnsurePromise(this.options.post, this.options.clientID, serverCount, this.options.shard);
    if (!service || service === 'all') return Promise.all(Object.keys(this.options.apiKeys).map(k => this.postManual(serverCount, k)));
    if (!Constants.AvailableServices.includes(service)) throw new Error('INVALID_SERVICE', service);
    if (!Object.keys(this.options.apiKeys).includes(service)) throw new Error('SERVICE_WITH_NO_KEY', service);
    if (service === 'discordbotlist') return FormatRequest(Constants.PostFormat[service](this.options.apiKeys[service], this.options.clientID, serverCount, this.options.shard, userCount, voiceConnections));
    return FormatRequest(Constants.PostFormat[service](this.options.apiKeys[service], this.options.clientID, serverCount, this.options.shard));
  }
}

module.exports = Poster;