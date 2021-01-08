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
 * Represents the Void Bots service.
 * @see https://docs.voidbots.net/
 */
var VoidBots = /** @class */ (function (_super) {
    __extends(VoidBots, _super);
    function VoidBots() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(VoidBots, "aliases", {
        /** The values that can be used to select the service. */
        get: function () {
            return ['voidbots', 'void', 'voidbots.net'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VoidBots, "logoURL", {
        /** The logo URL. */
        get: function () {
            return 'https://gblobscdn.gitbook.com/spaces%2F-MFw3t62urLlBeats8UJ%2Favatar-1598748054479.png';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VoidBots, "serviceName", {
        /** Service's name. */
        get: function () {
            return 'Void Bots';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VoidBots, "websiteURL", {
        /** The website URL. */
        get: function () {
            return 'https://voidbots.net/';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VoidBots, "baseURL", {
        /** The base URL of the service's API. */
        get: function () {
            return 'https://voidbots.net/api';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * <warn>Shard data posting is not supported for this service.</warn>
     * @param options The options of the request
     */
    VoidBots.post = function (options) {
        var token = options.token, clientID = options.clientID, serverCount = options.serverCount;
        return _super._post.call(this, {
            method: 'post',
            url: "/auth/stats/" + Util_1.Util.resolveID(clientID),
            headers: { Authorization: token, 'Content-Type': 'application/json' },
            data: { server_count: Util_1.Util.resolveCount(serverCount) }
        });
    };
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    VoidBots.prototype.getBot = function (id) {
        return this._request({ url: "/auth/info/" + Util_1.Util.resolveID(id) });
    };
    /**
     * Gets the user listed on this service.
     * @param id The user's ID
     */
    VoidBots.prototype.getUser = function (id) {
        return this._request({ url: "/user/info/" + Util_1.Util.resolveID(id) });
    };
    /**
     * Checks whether or not a user has voted for a bot on this service.
     * @param botId The bot's ID
     * @param userID The user's ID
     */
    VoidBots.prototype.userVoted = function (botId, userID) {
        return this._request({
            url: "/auth/voted/" + Util_1.Util.resolveID(botId),
            headers: { voter: Util_1.Util.resolveID(userID) }
        });
    };
    /**
     * Gets the bot's reviews on this service.
     * @param id The bot's ID
     */
    VoidBots.prototype.getBotReviews = function (id) {
        return this._request({
            url: "/auth/reviews/" + Util_1.Util.resolveID(id),
            headers: { Authorization: this.token }
        }, { requiresToken: true });
    };
    /**
     * Gets the bot's analytics on this service.
     * @param id The bot's ID
     */
    VoidBots.prototype.getBotAnalytics = function (id) {
        return this._request({
            url: "/auth/analytics/" + Util_1.Util.resolveID(id),
            headers: { Authorization: this.token }
        }, { requiresToken: true });
    };
    return VoidBots;
}(Service_1.Service));
exports.default = VoidBots;
