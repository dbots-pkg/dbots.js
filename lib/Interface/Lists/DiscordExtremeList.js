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
 * Represents the Discord Extreme List service.
 * @see https://docs.discordextremelist.xyz/
 */
var DiscordExtremeList = /** @class */ (function (_super) {
    __extends(DiscordExtremeList, _super);
    function DiscordExtremeList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DiscordExtremeList, "aliases", {
        get: function () {
            return [
                'discordextremelist',
                'discordextremelist.xyz',
                'discordextremelistxyz',
                'del'
            ];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordExtremeList, "logoURL", {
        get: function () {
            return 'https://get.snaz.in/4KjWg91.png';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordExtremeList, "serviceName", {
        get: function () {
            return 'Discord Extreme List';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordExtremeList, "websiteURL", {
        get: function () {
            return 'https://discordextremelist.xyz/';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordExtremeList, "baseURL", {
        get: function () {
            return 'https://api.discordextremelist.xyz/v2';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * @param options The options of the request
     */
    DiscordExtremeList.post = function (options) {
        var token = options.token, clientID = options.clientID, serverCount = options.serverCount, shard = options.shard;
        return _super._post.call(this, {
            method: 'post',
            url: "/bot/" + Util_1.default.resolveID(clientID) + "/stats",
            headers: { Authorization: token },
            data: {
                guildCount: Util_1.default.resolveCount(serverCount),
                shardCount: shard ? Util_1.default.resolveCount(shard.count) : undefined
            }
        });
    };
    /** Gets the statistics of this service. */
    DiscordExtremeList.prototype.getStatistics = function () {
        return this._request({
            url: '/stats',
            headers: { Authorization: this.token }
        }, {
            requiresToken: true
        });
    };
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    DiscordExtremeList.prototype.getBot = function (id) {
        return this._request({
            url: "/bot/" + Util_1.default.resolveID(id),
            headers: { Authorization: this.token }
        }, {
            requiresToken: true
        });
    };
    /**
     * Gets the user listed on this service.
     * @param id The bot's ID
     */
    DiscordExtremeList.prototype.getUser = function (id) {
        return this._request({
            url: "/user/" + Util_1.default.resolveID(id),
            headers: { Authorization: this.token }
        }, {
            requiresToken: true
        });
    };
    return DiscordExtremeList;
}(ServiceBase_1.default));
exports.default = DiscordExtremeList;
