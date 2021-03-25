"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientFiller = exports.ClientFiller = void 0;
var DBotsError_1 = require("../Utils/DBotsError");
/**
 * A class that gets certain values from a client.
 * @private
 */
var ClientFiller = /** @class */ (function () {
    /**
     * @param client The client that will be used
     */
    function ClientFiller(client) {
        if (!client || typeof client != 'object')
            throw new DBotsError_1.errors.Error('UNKNOWN_CLIENT');
        this.client = client;
    }
    Object.defineProperty(ClientFiller.prototype, "userCount", {
        /** Gets the amount of users the bot can reach. */
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
        case 'discordie': {
            return new (require('./Clients/Discordie')
                .default)(client);
        }
        case 'discord.io': {
            return new (require('./Clients/DiscordIO')
                .default)(client);
        }
        case 'discord.js': {
            return new (require('./Clients/DiscordJS')
                .default)(client);
        }
        case 'eris': {
            return new (require('./Clients/Eris').default)(client);
        }
        case 'paracord': {
            return new (require('./Clients/Paracord').default)(client);
        }
        default: {
            throw new Error("Unknown client '" + libraryName + "'");
        }
    }
}
exports.getClientFiller = getClientFiller;
