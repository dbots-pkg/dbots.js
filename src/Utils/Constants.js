/**
 * Options for a poster.
 * @typedef {Object} PosterOptions
 * @property {Object} [apiKeys] An object that pairs a {@link Service} with their token.
 * @property {Object} [client] The client that a supported {@link Library} uses to manage the Discord application.
 * Requires {@link #clientLibrary} to be present.
 * @property {string} [clientID] The client ID used for posting to a {@link Service}.
 * Automatically filled in when {@link #client} is present.
 * @property {Library} [clientLibrary] The library that the client is based on.
 * @property {PromiseResolvable} [post] The function to use when posting to a server that uses the client ID,
 * the amount of servers, and a {@link Shard}. This will be used when the {@link Service} is `custom`.
 * @property {Shard} [shard] The shard data for using different methods of posting to services.
 * @property {PromiseResolvable} [serverCount] The function to use when retrieving the amount of servers a client/shard is in.
 ^ Uses the client as a parameter.
 * @property {PromiseResolvable} [userCount] The function to use when retrieving the amount of users a client/shard is connected with.
 ^ Uses the client as a parameter.
 * @property {PromiseResolvable} [voiceConnections] The function to use when retrieving the number of active voice connections.
 ^ Uses the client as a parameter.
 * @property {number} [useSharding=true] Whether or not to use a {@link Service}s sharding method when posting.
 */

/**
 * A shard that is used when posting to services.
 * @typedef {Object} Shard
 * @property {number} [count] The amount of shards the client uses
 * @property {number} [id] The shard ID that is being used by the poster
 */

/**
 * A service supported by the package. Here are the available services:
 * * discordbotsgg
 * * topgg
 * * botsfordiscord
 * * botsondiscord
 * * discordappsdev
 * * carbon
 * * discordbotlist
 * * divinediscordbots
 * * discordboats
 * * botlistspace
 * * discordbotworld
 * * glennbotlist
 * @typedef {string} Service
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