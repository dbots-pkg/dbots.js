const Constants = require('../Utils/Constants');
const EnsurePromise = require('../Utils/EnsurePromise');
const FormatRequest = require('../Utils/FormatRequest');

/**
 * A class that posts server count to listing site(s).
 * @constructor
 * @param {PosterOptions} options The additional options.
 */
class DBotsPoster {
	constructor(options){
		if (!options || options.constructor.name !== 'Object') throw new Error("An Object is required to construct a poster.");
		this.client = options.client;
		if(this.client && !options.clientLibrary && !options.serverCount) throw new Error("clientID or serverCount must be defined when a client is defined.");
		if(!this.client && !options.clientID) throw new Error("clientID must be defined when client is non-existant.");
		if(this.client && !options.clientID) Object.assign(options, Constants.AutoValueFunctions(options.clientLibrary));
		this.options = options;
	}

	/**
	  * Retrieves the current server count of the client/shard
	  * @returns {Promise<Number>} Amount of servers the client/shard is in
	  */
	getServerCount(){
		if(!this.client) throw new Error('Cannot retrieve server count from non-existant client');
		if(this.options.serverCount) return new EnsurePromise(this.options.serverCount);
		return new EnsurePromise(Constants.ServerCountFunctions[this.options.clientLibrary](this.client));
	}

	/**
	  * Creates an interval that posts to all services
	  * @param {String} service The service to post to
	  * @returns {Interval} The interval that is responsible for posting
	  */
	startInterval(interval = 1800000, onRequest = null){
		if(this._interval) clearTimeout(this._interval);
		this._interval = setInterval(this.post, interval);
		return this._interval;
	}

	/**
	  * Destroys the current interval
	  */
	stopInterval(){
		if(this._interval) clearTimeout(this._interval);
	}

	/**
	  * Posts the current clients server count to a service
	  * @see DBotsPoster#postManual
	  */
	post(service){
		return new Promise((resolve, reject) => {
			this.getServerCount().then(count => {
				return this.postManual(count, service);
			}).then(resolve).catch(reject);
		})
	}

	/**
	  * Manually posts a server count to a service
	  * @param {Number} serverCount The server count to post to the service
	  * @param {String} service The service to post to
	  * @returns {Promise<Object|Array<Object>>} The result(s) of the post
	  */
	postManual(serverCount, service = 'all'){
		if(!this.options.apiKeys) throw new Error('NO_API_KEYS');
		if(!service || service == 'all') return Promise.all(Object.keys(this.options.apiKeys).map(k => this.postManual(serverCount, k)));
		if(!Constants.AvailableServices.includes(service)) throw new Error('INVALID_SERVICE', service);
		if(!Object.keys(this.options.apiKeys).includes(service)) throw new Error('SERVICE_WITH_NO_KEY', service);
		return FormatRequest(Constants.PostFormat[service](this.options.apiKeys[service], this.options.clientID, serverCount, this.options.shard));
	}
}

module.exports = DBotsPoster;