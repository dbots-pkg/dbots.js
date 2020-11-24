"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Discordie_1 = __importDefault(require("./Clients/Discordie"));
var DiscordIO_1 = __importDefault(require("./Clients/DiscordIO"));
var DiscordJS_1 = __importDefault(require("./Clients/DiscordJS"));
var Eris_1 = __importDefault(require("./Clients/Eris"));
var Paracord_1 = __importDefault(require("./Clients/Paracord"));
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
    /**
     * Gets a client filler from a library.
     * @param libraryName The name of the library to get
     * @param client The client that the library made
     */
    ClientFiller.get = function (libraryName, client) {
        if (!client)
            throw new Error('No client was provided!');
        switch (libraryName) {
            case 'discordie':
            case 'die': {
                return new Discordie_1.default(client);
            }
            case 'discord.io':
            case 'discordio':
            case 'd.io':
            case 'dio': {
                return new DiscordIO_1.default(client);
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
                return new DiscordJS_1.default(client);
            }
            case 'eris': {
                return new Eris_1.default(client);
            }
            case 'paracord.js':
            case 'paracordjs':
            case 'paracord': {
                return new Paracord_1.default(client);
            }
            default: {
                throw new Error("Unknown client '" + libraryName + "'");
            }
        }
    };
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
exports.default = ClientFiller;
