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
	carbon: (token, _, serverCount) => {
		return {
			method: 'post',
			url: 'https://www.carbonitex.net/discord/data/botdata.php',
			body: { key: token, servercount: serverCount }
		}
	}
}

exports.AvailableServices = [
	'botsdiscordpw',
	'discordbotsorg',
	'lsterminalink',
	'carbon'
]

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