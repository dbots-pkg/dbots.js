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
Object.defineProperty(exports, "__esModule", { value: true });
var Service_1 = require("../Service");
var Util_1 = require("../../Utils/Util");
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
        /** The values that can be used to select the service. */
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
        /** The logo URL. */
        get: function () {
            return 'https://get.snaz.in/4KjWg91.png';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordExtremeList, "serviceName", {
        /** Service's name. */
        get: function () {
            return 'Discord Extreme List';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordExtremeList, "websiteURL", {
        /** The website URL. */
        get: function () {
            return 'https://discordextremelist.xyz/';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordExtremeList, "baseURL", {
        /** The base URL of the service's API. */
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
            url: "/bot/" + Util_1.Util.resolveID(clientID) + "/stats",
            headers: { Authorization: token },
            data: {
                guildCount: Util_1.Util.resolveCount(serverCount),
                shardCount: shard ? Util_1.Util.resolveCount(shard.count) : undefined
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
            url: "/bot/" + Util_1.Util.resolveID(id),
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
            url: "/user/" + Util_1.Util.resolveID(id),
            headers: { Authorization: this.token }
        }, {
            requiresToken: true
        });
    };
    return DiscordExtremeList;
}(Service_1.Service));
exports.default = DiscordExtremeList;
