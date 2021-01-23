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
 * Represents the Glenn Bot List service.
 * @see https://docs.glennbotlist.xyz/
 */
var GlennBotList = /** @class */ (function (_super) {
    __extends(GlennBotList, _super);
    function GlennBotList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GlennBotList, "aliases", {
        /** The values that can be used to select the service. */
        get: function () {
            return ['glennbotlist', 'glennbotlist.xyz'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GlennBotList, "logoURL", {
        /** The logo URL. */
        get: function () {
            return 'https://get.snaz.in/8HphUE7.jpg';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GlennBotList, "serviceName", {
        /** Service's name. */
        get: function () {
            return 'Glenn Bot List';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GlennBotList, "websiteURL", {
        /** The website URL. */
        get: function () {
            return 'https://glennbotlist.xyz';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GlennBotList, "baseURL", {
        /** The base URL of the service's API. */
        get: function () {
            return 'https://glennbotlist.xyz/api';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * @param options The options of the request
     */
    GlennBotList.post = function (options) {
        var token = options.token, clientID = options.clientID, serverCount = options.serverCount, shard = options.shard;
        return _super._post.call(this, {
            method: 'post',
            url: "/bot/" + Util_1.Util.resolveID(clientID) + "/stats",
            headers: { Authorization: token },
            data: {
                serverCount: Util_1.Util.resolveCount(serverCount),
                shardCount: shard ? Util_1.Util.resolveCount(shard.count) : undefined
            }
        });
    };
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    GlennBotList.prototype.getBot = function (id) {
        return this._request({ url: "/bot/" + Util_1.Util.resolveID(id) });
    };
    /**
     * Gets the list of people who voted this bot on this service.
     * @param id The bot's ID
     */
    GlennBotList.prototype.getBotVotes = function (id) {
        return this._request({
            url: "/bot/" + Util_1.Util.resolveID(id) + "/votes",
            headers: { Authorization: this.token }
        }, {
            requiresToken: true
        });
    };
    /**
     * Get a user's profile listed on this service.
     * @param id The user's ID
     */
    GlennBotList.prototype.getUser = function (id) {
        return this._request({ url: "/user/" + Util_1.Util.resolveID(id) });
    };
    /**
     * Gets the widget URL for this bot.
     * @param id The bot's ID
     * @param query The query string that will be used in the request
     */
    GlennBotList.prototype.getWidgetURL = function (id, query) {
        return this._appendQuery("https://glennbotlist.xyz/bot/" + Util_1.Util.resolveID(id) + "/widget", query || {}, false);
    };
    return GlennBotList;
}(Service_1.Service));
exports.default = GlennBotList;
