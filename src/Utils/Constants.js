exports.PostFormat = {
    botsdiscordpw: (token, botID, serverCount, shard) => {
        return {
            method: 'post',
            url: `https://bots.discord.pw/api/bots/${botID}/stats`,
            headers: { Authorization: token },
            body: shard ? { server_count: serverCount, shard_id: shard.id, shard_count: shard.count } : { server_count: serverCount }
        }
    },
    discordbotsorg: (token, botID, serverCount, shard) => {
        return {
            method: 'post',
            url: `https://discordbots.org/api/bots/${botID}/stats`,
            headers: { Authorization: token },
            body: shard ? { server_count: serverCount, shard_id: shard.id, shard_count: shard.count } : { server_count: serverCount }
        }
    },
    lsterminalink: (token, botID, serverCount, shard) => {
        return {
            method: 'post',
            url: `https://ls.terminal.ink/api/v1/bots/${botID}`,
            headers: { Authorization: token },
            body: { server_count: serverCount }
        }
    },
    carbon: (token, _, serverCount, shard) => {
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
    'discordie',
    'eris'
]

exports.ServerCountFunctions = {
    'discord.js': client => {
        if(client.shard) return new Promise((resolve, reject) => {
            client.shard.fetchClientValues('guilds.size').then((servers) => {
                resolve(servers.reduce((prev, val) => prev + val, 0))
            }).catch(reject);
        }); else return client.guilds.size;
    },
    'discord.io': client => {

    }
}

exports.BotsDiscordPW = {
    getUser: (userID) => {
        return { url: `https://bots.discord.pw/api/users/${userID}` }
    },
    getBot: (token, botID) => {
        return {
            url: `https://bots.discord.pw/api/bots/${botID}`,
            headers: { Authorization: token }
        }
    },
    getBots: (token) => {
        return {
            url: `https://bots.discord.pw/api/bots`,
            headers: { Authorization: token }
        }
    },
    getBotStats: (token, botID) => {
        return {
            url: `https://bots.discord.pw/api/bots/${botID}/stats`,
            headers: { Authorization: token }
        }
    }
}

exports.lsTerminalInk = {
    test: (token, userID) => {
        return {
            url: `https://ls.terminal.ink/api/v1/bots/${botID}`,
            headers: { Authorization: token }
        }
    },
    getBot: (botID) => {
        return { url: `https://ls.terminal.ink/api/v1/bots/${botID}` }
    },
    getBots: (botID) => {
        return { url: `https://ls.terminal.ink/api/v1/bots` }
    },
    getBotEmbed: (botID, query) => {
        return { url: `https://ls.terminal.ink/api/v1/bots/${botID}`, query }
    }
}

exports.DiscordBotsOrg = {
    getUser: (userID) => {
        return { url: `https://discordbots.org/api/users/${userID}` }
    },
    getBot: (botID) => {
        return { url: `https://discordbots.org/api/bots/${botID}` }
    },
    getBotVotes: (botID, query) => {
        return { url: `https://discordbots.org/api/bots/${botID}/votes`, query }
    },
    getBotStats: (botID, query) => {
        return { url: `https://discordbots.org/api/bots/${botID}/stats` }
    },
    getBotEmbed: (botID, query) => {
        return { url: `https://discordbots.org/api/widget/${botID}.png`, query }
    }
}