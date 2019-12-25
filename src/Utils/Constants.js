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
exports.PostFormat = {
  topgg: (token, clientID, serverCount, shard) => {
    return {
      method: 'post',
      url: `https://top.gg/api/bots/${clientID}/stats`,
      headers: { Authorization: token },
      data: shard ? { server_count: serverCount, shard_id: shard.id, shard_count: shard.count } : { server_count: serverCount }
    };
  },
  discordbotsorg: (...a) => exports.PostFormat.topgg(...a), // deprecated
  discordappsdev: (token, clientID, serverCount) => {
    return {
      method: 'post',
      url: `https://api.discordapps.dev/api/v2/bots/${clientID}`,
      headers: { Authorization: token },
      data: { bot: { count: serverCount } }
    };
  },
  botsfordiscord: (token, clientID, serverCount) => {
    return {
      method: 'post',
      url: `https://botsfordiscord.com/api/bot/${clientID}`,
      headers: { Authorization: token },
      data: { server_count: serverCount }
    };
  },
  botsondiscord: (token, clientID, serverCount) => {
    return {
      method: 'post',
      url: `https://bots.ondiscord.xyz/bot-api/bots/${clientID}/guilds`,
      headers: { Authorization: token },
      data: { guildCount: serverCount }
    };
  },
  listcord: (token, clientID, serverCount) => {
    return {
      method: 'post',
      url: `https://listcord.com/api/bot/${clientID}/guilds`,
      headers: { Authorization: token },
      data: { guilds: serverCount }
    };
  },
  carbon: (token, _, serverCount) => {
    return {
      method: 'post',
      url: 'https://www.carbonitex.net/discord/data/botdata.php',
      data: { key: token, servercount: serverCount }
    };
  },
  discordbotlist: (token, clientID, serverCount, shard, usersCount, voiceConnections) => {
    const data = { guilds: serverCount };
    if (shard) data.shard_id = shard.id;
    if (usersCount) data.users = usersCount;
    if (voiceConnections) data.voice_connections = voiceConnections;

    return {
      method: 'post',
      url: `https://discordbotlist.com/api/bots/${clientID}/stats`,
      headers: { Authorization: `Bot ${token}` },
      data
    };
  },
  divinediscordbots: (token, clientID, serverCount) => {
    return {
      method: 'post',
      url: `https://divinediscordbots.com/bot/${clientID}/stats`,
      headers: { Authorization: token },
      data: { server_count: serverCount }
    };
  },
  discordboats: (token, clientID, serverCount) => {
    return {
      method: 'post',
      url: `https://discord.boats/api/v2/bot/${clientID}`,
      headers: { Authorization: token },
      data: { server_count: serverCount }
    };
  },
  botlistspace: (token, clientID, serverCount) => {
    return {
      method: 'post',
      url: `https://api.botlist.space/v1/bots/${clientID}`,
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      data: { server_count: serverCount }
    };
  },
  discordbotworld: (token, clientID, serverCount) => {
    return {
      method: 'post',
      url: `https://discordbot.world/api/bot/${clientID}/stats`,
      headers: { Authorization: token },
      data: { guild_count: serverCount }
    };
  }
};

/**
 * A service supported by the package. Here are the available services:
 * * discordbotsgg
 * * discordbotsorg (deprecated)
 * * topgg
 * * botsfordiscord
 * * botsondiscord
 * * discordappsdev
 * * listcord
 * * carbon
 * * discordbotlist
 * * divinediscordbots
 * * discordboats
 * * botlistspace
 * * discordbotworld
 * @typedef {string} Service
 */

exports.AvailableServices = [
  'discordbotsgg',
  'discordbotsorg', // deprecated
  'topgg',
  'botsfordiscord',
  'botsondiscord',
  'discordappsdev',
  'listcord',
  'carbon',
  'discordbotlist',
  'divinediscordbots',
  'discordboats',
  'botlistspace',
  'discordbotworld'
];

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
];

exports.ServerCountFunctions = {
  'discord.js': client => { return client.guilds.size; },
  'discord.io': client => { return Object.keys(client.servers).length; },
  'discordie': client => { return client.Guilds.size; }
};

/**
 * An event that can be added an handler for. These are the available events:
 * * autopost
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
exports.SupportedEvents = [
  'autopost',
  'autopostfail'
];

exports.UserCountFunctions = {
  'discord.js': client => { return client.users.size; },
  'discord.io': client => { return Object.keys(client.users).length; },
  'discordie': client => { return client.Users.size; }
};

exports.VoiceConnectionsFunctions = {
  'discord.js': client => { return client.broadcasts.size; },
  'discord.io': client => { return Object.keys(client._vChannels).length; },
  'discordie': client => { return client.VoiceConnections.length; }
};

exports.AutoValueFunctions = {
  'discord.js': client => {
    return {
      clientID: client.user.id,
      shard: client.shard ? { id: client.shard.id, count: client.shard.count } : undefined
    };
  },
  'discord.io': client => {
    return {
      clientID: client.id,
      shard: client._shard ? { id: client._shard[0], count: client._shard[1] } : undefined
    };
  },
  'discordie': client => {
    return {
      clientID: client.User.id,
      shard: client.options.shardId && client.options.shardCount ? { id: client.options.shardId, count: client.options.shardCount } : undefined
    };
  }
};
