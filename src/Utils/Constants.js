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
 * @property {number} [useSharding=true] Whether or not to use a {@link Service}s sharding method when posting.
 */

/**
 * A shard that is used when posting to services.
 * @typedef {Object} Shard
 * @property {number} [count] The amount of shards the client uses
 * @property {number} [id] The shard ID that is being used by the poster
 */

exports.PostFormat = {
	botsdiscordpw: (token, clientID, serverCount, shard) => {
		return {
			method: 'post',
			url: `https://bots.discord.pw/api/bots/${clientID}/stats`,
			headers: { Authorization: token },
			body: shard ? { server_count: serverCount, shard_id: shard.id, shard_count: shard.count } : { server_count: serverCount }
		}
	},
	discordbotsorg: (token, clientID, serverCount, shard) => {
		return {
			method: 'post',
			url: `https://discordbots.org/api/bots/${clientID}/stats`,
			headers: { Authorization: token },
			body: shard ? { server_count: serverCount, shard_id: shard.id, shard_count: shard.count } : { server_count: serverCount }
		}
	},
	lsterminalink: (token, clientID, serverCount) => {
		return {
			method: 'post',
			url: `https://ls.terminal.ink/api/v1/bots/${clientID}`,
			headers: { Authorization: token },
			body: { server_count: serverCount }
		}
	},
	botsfordiscord: (token, clientID, serverCount) => {
		return {
			method: 'post',
			url: `https://botsfordiscord.com/api/v1/bots/${clientID}`,
			headers: { Authorization: token },
			body: { server_count: serverCount }
		}
	},
	carbon: (token, _, serverCount) => {
		return {
			method: 'post',
			url: 'https://www.carbonitex.net/discord/data/botdata.php',
			body: { key: token, servercount: serverCount }
		}
	}
}

/**
 * A service supported by the package. Here are the available services:
 * * botsdiscordpw
 * * discordbotsorg
 * * lsterminalink
 * * carbon
 * @typedef {string} Service
 */

exports.AvailableServices = [
	'botsdiscordpw',
	'discordbotsorg',
	'lsterminalink',
	'carbon'
]

/**
 * A library supported by the package. Here are the available libraries:
 * * discord.js
 * * discord.io
 * * discordie
 * @typedef {string} Library
 */

exports.SupportingLibraries = [
	'discord.js',
	'discord.io',
	'discordie'
]

exports.ServerCountFunctions = {
	'discord.js': client => { return client.guilds.size; },
	'discord.io': client => { return Object.keys(client.servers).length; },
	'discordie': client => { return client.Guilds.size; }
}

exports.AutoValueFunctions = {
	'discord.js': client => { return {
		clientID: client.user.id,
		shard: client.shard ? { id: client.shard.id, count: client.shard.count } : undefined
	}; },
	'discord.io': client => { return {
		clientID: client.id,
		shard: client._shard ? { id: client._shard[0], count: client._shard[1] } : undefined
	}; },
	'discordie': client => { return {
		clientID: client.User.id,
		shard: client.options.shardId && client.options.shardCount ? { id: client.options.shardId, count: client.options.shardCount } : undefined
	}; }
}