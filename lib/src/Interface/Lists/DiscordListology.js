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
 * Represents the DiscordListology service.
 * @see https://discordlistology.com/developer/documentation
 */
var DiscordListology = /** @class */ (function (_super) {
    __extends(DiscordListology, _super);
    function DiscordListology() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DiscordListology, "aliases", {
        /** The values that can be used to select the service. */
        get: function () {
            return ['discordlistology'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordListology, "logoURL", {
        /** The logo URL. */
        get: function () {
            return 'https://discordlistology.com/idiscord.png';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordListology, "serviceName", {
        /** Service's name. */
        get: function () {
            return 'DiscordListology';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordListology, "websiteURL", {
        /** The website URL. */
        get: function () {
            return 'https://discordlistology.com/';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordListology, "baseURL", {
        /** The base URL of the service's API. */
        get: function () {
            return 'https://discordlistology.com/api/v1';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * @param options The options of the request
     */
    DiscordListology.post = function (options) {
        var token = options.token, clientID = options.clientID, serverCount = options.serverCount, shard = options.shard;
        return _super._post.call(this, {
            method: 'post',
            url: "/bots/" + Util_1.default.resolveID(clientID) + "/stats",
            headers: { Authorization: token },
            data: shard
                ? {
                    servers: Util_1.default.resolveCount(serverCount),
                    shards: shard.count
                }
                : { servers: Util_1.default.resolveCount(serverCount) }
        });
    };
    /**
     * Gets the bot's stats listed on this service.
     * @param id The bot's ID
     */
    DiscordListology.prototype.getBotStats = function (id) {
        return this._request({ url: "/bots/" + Util_1.default.resolveID(id) + "/stats" });
    };
    /**
     * Checks whether or not a user has voted for a bot on this service.
     * @param id The bot's ID
     * @param userID The user's ID
     */
    DiscordListology.prototype.userVotedBot = function (id, userID) {
        return this._request({
            url: "/bots/" + Util_1.default.resolveID(userID) + "/hasvoted/" + Util_1.default.resolveID(id)
        });
    };
    /**
     * Gets the guild's stats listed on this service.
     * @param id The guild's ID
     */
    DiscordListology.prototype.getGuildStats = function (id) {
        return this._request({ url: "/guilds/" + Util_1.default.resolveID(id) + "/stats" });
    };
    /**
     * Checks whether or not a user has voted for a guild on this service.
     * @param id The guild's ID
     * @param userID The user's ID
     */
    DiscordListology.prototype.userVotedGuild = function (id, userID) {
        return this._request({
            url: "/guilds/" + Util_1.default.resolveID(userID) + "/hasvoted/" + Util_1.default.resolveID(id)
        });
    };
    return DiscordListology;
}(ServiceBase_1.default));
exports.default = DiscordListology;
