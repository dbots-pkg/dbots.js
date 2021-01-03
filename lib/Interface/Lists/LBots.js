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
 * Represents the LBots service.
 * @see https://lbots.org/api/docs
 */
var LBots = /** @class */ (function (_super) {
    __extends(LBots, _super);
    function LBots() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(LBots, "aliases", {
        /** The values that can be used to select the service. */
        get: function () {
            return ['lbots', 'lbotsorg', 'lbots.org'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LBots, "logoURL", {
        /** The logo URL. */
        get: function () {
            return 'https://i.olsh.me/icon?size=1..100..500&url=lbots.org';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LBots, "serviceName", {
        /** Service's name. */
        get: function () {
            return 'LBots';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LBots, "websiteURL", {
        /** The website URL. */
        get: function () {
            return 'https://lbots.org/';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LBots, "baseURL", {
        /** The base URL of the service's API. */
        get: function () {
            return 'https://lbots.org/api/v1';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * @param options The options of the request
     */
    LBots.post = function (options) {
        var token = options.token, clientID = options.clientID, serverCount = options.serverCount, shard = options.shard;
        return _super._post.call(this, {
            method: 'post',
            url: "/bots/" + Util_1.Util.resolveID(clientID) + "/stats",
            headers: { Authorization: token },
            data: shard
                ? {
                    guild_count: Util_1.Util.resolveCount(serverCount),
                    shard_id: shard.id,
                    shard_count: shard.count
                }
                : { guild_count: Util_1.Util.resolveCount(serverCount) }
        });
    };
    /**
     * Invalidates the token being used in the request.
     * @param id The bot's ID
     */
    LBots.prototype.invalidate = function (id) {
        return this._request({
            url: "/bots/" + Util_1.Util.resolveID(id) + "/invalidate",
            headers: { Authorization: this.token }
        }, {
            requiresToken: true
        });
    };
    /**
     * Gets the list of people who favorited this bot on this service.
     * @param id The bot's ID
     */
    LBots.prototype.getBotFavorites = function (id) {
        return this._request({
            url: "/bot/" + Util_1.Util.resolveID(id) + "/favorites",
            headers: { Authorization: this.token }
        }, {
            requiresToken: true
        });
    };
    /**
     * Checks whether or not a user has favorited a bot on this service.
     * @param id The bot's ID
     * @param userID The user's ID
     */
    LBots.prototype.userFavorited = function (id, userID) {
        return this._request({
            url: "/bots/" + Util_1.Util.resolveID(id) + "/favorites/user/" + Util_1.Util.resolveID(userID),
            headers: { Authorization: this.token }
        }, {
            requiresToken: true
        });
    };
    /**
     * Updates the guilds on the bot's panel.
     * @param id The bot's ID
     * @param data The data being posted
     */
    LBots.prototype.updatePanelGuilds = function (id, data) {
        return this._request({
            method: 'post',
            url: "/panel/" + Util_1.Util.resolveID(id) + "/guilds",
            headers: { Authorization: this.token },
            data: data
        }, {
            requiresToken: true
        });
    };
    /**
     * Gets a guilds settings from the bot's panel.
     * @param id The bot's ID
     * @param guildID The guild's ID
     */
    LBots.prototype.getPanelGuildSettings = function (id, guildID) {
        return this._request({
            url: "/panel/" + Util_1.Util.resolveID(id) + "/guild/" + Util_1.Util.resolveID(guildID),
            headers: { Authorization: this.token }
        }, {
            requiresToken: true
        });
    };
    /**
     * Gets a guilds settings from the bot's panel.
     * @param id The bot's ID
     * @param guildID The guild's ID
     * @param data The data being posted
     */
    LBots.prototype.updatePanelGuildSettings = function (id, guildID, data) {
        return this._request({
            url: "/panel/" + Util_1.Util.resolveID(id) + "/guild/" + Util_1.Util.resolveID(guildID) + "/update",
            headers: { Authorization: this.token },
            data: data
        }, {
            requiresToken: true
        });
    };
    return LBots;
}(Service_1.Service));
exports.default = LBots;
