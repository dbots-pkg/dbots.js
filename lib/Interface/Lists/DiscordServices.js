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
 * Represents the Discord Services service.
 * @see https://discordservices.net/docs/api
 */
var DiscordServices = /** @class */ (function (_super) {
    __extends(DiscordServices, _super);
    function DiscordServices() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DiscordServices, "aliases", {
        /** The values that can be used to select the service. */
        get: function () {
            return ['discordservices', 'discordservices.net'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordServices, "logoURL", {
        /** The logo URL. */
        get: function () {
            return 'https://discordservices.net/icon.png';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordServices, "serviceName", {
        /** Service's name. */
        get: function () {
            return 'Discord Services';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordServices, "websiteURL", {
        /** The website URL. */
        get: function () {
            return 'https://discordservices.net';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordServices, "baseURL", {
        /** The base URL of the service's API. */
        get: function () {
            return 'https://api.discordservices.net';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * @param options The options of the request
     */
    DiscordServices.post = function (options) {
        var token = options.token, clientID = options.clientID, serverCount = options.serverCount, shard = options.shard;
        return _super._post.call(this, {
            method: 'post',
            url: "/bot/" + Util_1.Util.resolveID(clientID) + "/stats",
            headers: { Authorization: token },
            data: shard
                ? {
                    servers: Util_1.Util.resolveCount(serverCount),
                    shards: shard.count
                }
                : { servers: Util_1.Util.resolveCount(serverCount) }
        });
    };
    /**
     * Posts news to your bot page
     * @param id The bot's ID
     * @param title The title of the post
     * @param content The content of the post
     */
    DiscordServices.prototype.postNews = function (id, title, content) {
        return this._request({
            method: 'post',
            url: "/bot/" + Util_1.Util.resolveID(id) + "/news",
            headers: { Authorization: this.token },
            data: {
                title: title,
                content: content,
                error: false
            }
        }, { requiresToken: true });
    };
    /**
     * Posts commands info to your bot page
     * @param id The bot's ID
     * @param commands The command info to post
     */
    DiscordServices.prototype.postCommands = function (id, commands) {
        return this._request({
            method: 'post',
            url: "/bot/" + Util_1.Util.resolveID(id) + "/commands",
            headers: { Authorization: this.token },
            data: commands
        }, { requiresToken: true });
    };
    return DiscordServices;
}(Service_1.Service));
exports.default = DiscordServices;
