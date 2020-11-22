"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ServiceBase_1 = __importDefault(require("../ServiceBase"));
var Util_1 = __importDefault(require("../../Utils/Util"));
/**
 * Represents the Discord Bot World service.
 * @see https://discordbot.world/docs
 */
var DiscordBotWorld = /** @class */ (function (_super) {
    __extends(DiscordBotWorld, _super);
    function DiscordBotWorld() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DiscordBotWorld, "aliases", {
        get: function () {
            return ['discordbotworld', 'discordbot.world', 'dbotworld', 'dbw'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordBotWorld, "logoURL", {
        get: function () {
            return 'https://i.olsh.me/icon?size=1..100..500&url=discordbot.world';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordBotWorld, "serviceName", {
        get: function () {
            return 'Discord Bot World';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordBotWorld, "websiteURL", {
        get: function () {
            return 'https://discordbot.world';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordBotWorld, "baseURL", {
        get: function () {
            return 'https://discordbot.world/api';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * <warn>Shard data posting is not supported for this service.</warn>
     * @param options The options of the request
     */
    DiscordBotWorld.post = function (options) {
        var token = options.token, clientID = options.clientID, serverCount = options.serverCount;
        return _super._post.call(this, {
            method: 'post',
            url: "/bot/" + Util_1.default.resolveID(clientID) + "/stats",
            headers: { Authorization: token },
            data: { guild_count: serverCount },
        });
    };
    /** Gets a list of bots on this service. */
    DiscordBotWorld.prototype.getBots = function () {
        return this._request({ url: '/bots' });
    };
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    DiscordBotWorld.prototype.getBot = function (id) {
        return this._request({ url: "/bots/" + Util_1.default.resolveID(id) + "/info" });
    };
    /**
     * Gets the bot's stats on this service.
     * @param id The bot's ID
     */
    DiscordBotWorld.prototype.getBotStats = function (id) {
        return this._request({ url: "/bots/" + Util_1.default.resolveID(id) + "/stats" });
    };
    /**
     * Gets the list of people who liked this bot on this service.
     * @param id The bot's ID
     */
    DiscordBotWorld.prototype.getBotLikes = function (id) {
        return this._request({
            url: "/bots/" + Util_1.default.resolveID(id) + "/likes",
            headers: { Authorization: this.token },
        }, {
            requiresToken: true,
        });
    };
    /**
     * Gets the user listed on this service.
     * @param id The user's ID
     */
    DiscordBotWorld.prototype.getUser = function (id) {
        return this._request({ url: "/user/" + Util_1.default.resolveID(id) });
    };
    return DiscordBotWorld;
}(ServiceBase_1.default));
exports.default = DiscordBotWorld;
