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
var Constants_1 = require("../../Utils/Constants");
/**
 * Represents the Discord Bots service.
 * @see https://discord.bots.gg/docs
 */
var DiscordBotsGG = /** @class */ (function (_super) {
    __extends(DiscordBotsGG, _super);
    //
    /**
     * @param token The token/key for the service
     * @param userAgent The user agent options of the service. Providing this is highly recommended.
     */
    function DiscordBotsGG(token, userAgent) {
        var _this = _super.call(this, token) || this;
        _this.agent = {
            library: (userAgent === null || userAgent === void 0 ? void 0 : userAgent.library) || 'unknown',
            clientID: (userAgent === null || userAgent === void 0 ? void 0 : userAgent.clientID) || '000000000000000'
        };
        return _this;
    }
    Object.defineProperty(DiscordBotsGG, "aliases", {
        /** The values that can be used to select the service. */
        get: function () {
            return ['discordbotsgg', 'discord.bots.gg'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordBotsGG, "logoURL", {
        /** The logo URL. */
        get: function () {
            return 'https://i.olsh.me/icon?size=1..100..500&url=discord.bots.gg';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordBotsGG, "serviceName", {
        /** Service's name. */
        get: function () {
            return 'Discord Bots';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordBotsGG, "websiteURL", {
        /** The website URL. */
        get: function () {
            return 'https://discord.bots.gg';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordBotsGG, "baseURL", {
        /** The base URL of the service's API. */
        get: function () {
            return 'https://discord.bots.gg/api/v1';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Creates a compliant user agent to use for any API calls to Discord Bots.
     * @param botID The ID of the bot that the agent will be identified with
     * @param library The library the agent is using
     */
    DiscordBotsGG.userAgent = function (botID, library) {
        if (library === void 0) { library = 'unknown'; }
        return "dbots-0000/" + Constants_1.Package.version + " (" + library + "; +https://github.com/dbots-pkg/dbots.js) DBots/" + Util_1.Util.resolveID(botID);
    };
    /**
     * Posts statistics to this service.
     * @param options The options of the request
     */
    DiscordBotsGG.post = function (options) {
        var token = options.token, clientID = options.clientID, serverCount = options.serverCount, shard = options.shard;
        return _super._post.call(this, {
            method: 'post',
            url: "/bots/" + Util_1.Util.resolveID(clientID) + "/stats",
            headers: {
                Authorization: token,
                'User-Agent': DiscordBotsGG.userAgent(clientID)
            },
            data: shard
                ? {
                    guildCount: Util_1.Util.resolveCount(serverCount),
                    shardId: shard.id,
                    shardCount: shard.count
                }
                : { guildCount: Util_1.Util.resolveCount(serverCount) }
        });
    };
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     * @param sanitized Whether to sanitize descriptions
     */
    DiscordBotsGG.prototype.getBot = function (id, sanitized) {
        if (sanitized === void 0) { sanitized = false; }
        return this._request({
            url: "/bots/" + Util_1.Util.resolveID(id),
            headers: {
                Authorization: this.token,
                'User-Agent': DiscordBotsGG.userAgent(this.agent.clientID, this.agent.library)
            },
            params: { sanitized: sanitized }
        }, {
            requiresToken: true
        });
    };
    /**
     * Gets a list of bots on this service.
     * @param query The query string that will be used in the request
     */
    DiscordBotsGG.prototype.getBots = function (query) {
        return this._request({
            url: '/bots',
            headers: {
                Authorization: this.token,
                'User-Agent': DiscordBotsGG.userAgent(this.agent.clientID, this.agent.library)
            },
            params: query
        }, {
            requiresToken: true
        });
    };
    return DiscordBotsGG;
}(Service_1.Service));
exports.default = DiscordBotsGG;
