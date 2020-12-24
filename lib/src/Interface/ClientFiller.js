"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientFiller = exports.ClientFiller = void 0;
/**
 * A class that gets certain values from a client.
 * @private
 */
var ClientFiller = /** @class */ (function () {
    /**
     * @param client The client that will be used
     */
    function ClientFiller(client) {
        this.client = client;
    }
    Object.defineProperty(ClientFiller.prototype, "userCount", {
        /** Gets the amount of users the bot has cached. */
        get: function () {
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ClientFiller.prototype, "serverCount", {
        /** Gets the amount of servers the bot has cached. */
        get: function () {
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ClientFiller.prototype, "voiceConnections", {
        /** Gets the amount of voice connectinos the bot is using. */
        get: function () {
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ClientFiller.prototype, "clientID", {
        /** Gets the client ID (technically the user ID) of the bot. */
        get: function () {
            return undefined;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ClientFiller.prototype, "shard", {
        /** Gets the shard of the bot. */
        get: function () {
            return undefined;
        },
        enumerable: false,
        configurable: true
    });
    return ClientFiller;
}());
exports.ClientFiller = ClientFiller;
/**
 * Gets a client filler from a library.
 * @param libraryName The name of the library to get
 * @param client The client that the library made
 */
function getClientFiller(libraryName, client) {
    if (!client)
        throw new Error('No client was provided!');
    switch (libraryName) {
        case 'discordie':
        case 'die': {
            return new (require('./Clients/Discordie'))(client);
        }
        case 'discord.io':
        case 'discordio':
        case 'd.io':
        case 'dio': {
            return new (require('./Clients/DiscordIO'))(client);
        }
        case 'discord.js':
        case 'discordjs':
        case 'd.js':
        case 'djs':
        case 'discord.js-commando':
        case 'discordjs-commando':
        case 'd.js-commando':
        case 'djs-commando':
        case 'commando': {
            return new (require('./Clients/DiscordJS'))(client);
        }
        case 'eris': {
            return new (require('./Clients/Eris'))(client);
        }
        case 'paracord.js':
        case 'paracordjs':
        case 'paracord': {
            return new (require('./Clients/Paracord'))(client);
        }
        default: {
            throw new Error("Unknown client '" + libraryName + "'");
        }
    }
}
exports.getClientFiller = getClientFiller;
