/**
 * Options for a poster.
 * @typedef {Object} PosterOptions
 * @property {Record<Service, string>} [apiKeys] An object that pairs a {@link Service} with their token
 * @property {Object} [client] The client that a supported {@link Library} uses to manage the Discord application.
 * Requires {@link #clientLibrary} to be present
 * @property {string} [clientID] The client ID used for posting to a {@link Service}.
 * Automatically filled in when {@link #client} is present
 * @property {Library} [clientLibrary] The library that the client is based on
 * @property {PromiseResolvable} [post] The function to use when posting to a server that uses the client ID,
 * the amount of servers, and a {@link Shard}. This will be used when the {@link Service} is `custom`
 * @property {Shard} [shard] The shard data for using different methods of posting to services
 * @property {PromiseResolvable} [serverCount] The function to use when retrieving the amount of servers a client/shard is in, using the client as a parameter
 * @property {PromiseResolvable} [userCount] The function to use when retrieving the amount of users a client/shard is connected with, using the client as a parameter
 * @property {PromiseResolvable} [voiceConnections] The function to use when retrieving the number of active voice connections, using the client as a parameter
 * @property {Array<CustomService>} [customServices] The custom services that the poster will use
 * @property {number} [useSharding=true] Whether or not to use a {@link ServiceBase}s sharding method when posting
 */

/**
 * A shard that is used when posting to services.
 * @typedef {Object} Shard
 * @property {number} [count] The amount of shards the client uses
 * @property {number} [id] The shard ID that is being used by the poster
 */

/**
 * The object that is given to {@link ServiceBase}s and {@link CustomService}s in order to send requests to them.
 * @typedef {Object} PostRequestData
 * @param {string} token The Authorization token for the request
 * @param {string} clientID The client ID that the request will post for
 * @param {number} serverCount The amount of servers that the client is in
 * @param {number} userCount The amount of users that the client cached
 * @param {number} voiceConnections The amount of voice connections the client has
 * @param {Shard} shard The shard the request is representing
 */

/**
 * An object with all query parameters
 * @typedef {Object.<string, string|number>} Query
 */

/**
 * A mock of a {@link Service} that only consists of the nessessities for a poster to use it.
 * @typedef {Object} CustomService
 * @property {Array<string>} aliases The keys that this service can get called from
 * @property {function} post The function that sends a request with the parameter being a {@link PostRequestData}.
 * Must return an axios Response object (use [`dbots.FormatRequest`](https://github.com/dbots-pkg/dbots.js/blob/master/src/Utils/FormatRequest.js#L14)).
 */

/**
 * A {@link ServiceBase} key supported by the package.
 * This can also includes keys from {@link CustomService}s and can be `custom` if a {@link Poster} has a custom post function.
 * @see {@link https://dbots.js.org/#/docs/main/master/general/services}
 * @typedef {string} Service
 */

/**
 * @typedef
 */

/**
 * A library supported by the package. Here are the available libraries:
 * * discord.js
 * * discord.io
 * * discordie
 * * eris
 * @typedef {string} Library
 */

/**
 * Type of function to set for handlers
 * @typedef {Function} eventHandler
 * @param {Object|Array<Object>} result The result(s) of the post
 */

/**
 * An event that can be added an handler for. These are the available events:
 * * autopost
 * * autopostfail
 * * post
 * * postfail
 * @typedef {string} CustomEvent
 */
/**
 * Emitted when the interval has ran.
 * @event Poster#autopost
 * @param {Object|Array<Object>} result The result(s) of the post
 */
/**
 * Emitted when the interval failed to post.
 * @event Poster#autopostfail
 * @param {Object|Array<Object>} result The error(s) of the post
 */
/**
 * Emitted when a post succeeds.
 * @event Poster#post
 * @param {Object} result The result of the post
 */
/**
 * Emitted when a post fails.
 * @event Poster#postfail
 * @param {Object} result The error of the post
 */
exports.SupportedEvents = [
  'autopost',
  'autopostfail',
  'post',
  'postfail'
];

exports.Package = require('../../package.json');
