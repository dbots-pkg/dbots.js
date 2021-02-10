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
 * Represents the Top.gg service.
 * @see https://top.gg/api/docs
 */
var TopGG = /** @class */ (function (_super) {
    __extends(TopGG, _super);
    function TopGG() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TopGG, "aliases", {
        /** The values that can be used to select the service. */
        get: function () {
            return ['topgg', 'top.gg'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TopGG, "logoURL", {
        /** The logo URL. */
        get: function () {
            return 'https://top.gg/images/dblnew.png';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TopGG, "serviceName", {
        /** Service's name. */
        get: function () {
            return 'Top.gg';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TopGG, "websiteURL", {
        /** The website URL. */
        get: function () {
            return 'https://top.gg';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TopGG, "baseURL", {
        /** The base URL of the service's API. */
        get: function () {
            return 'https://top.gg/api';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * @param options The options of the request
     */
    TopGG.post = function (options) {
        var token = options.token, clientID = options.clientID, serverCount = options.serverCount, shard = options.shard;
        return _super._post.call(this, {
            method: 'post',
            url: "/bots/" + Util_1.Util.resolveID(clientID) + "/stats",
            headers: { Authorization: token },
            data: shard
                ? {
                    server_count: Util_1.Util.resolveCount(serverCount),
                    shard_id: shard.id,
                    shard_count: shard.count
                }
                : { server_count: Util_1.Util.resolveCount(serverCount) }
        });
    };
    /**
     * Gets the user listed on this service.
     * @param id The user's ID
     */
    TopGG.prototype.getUser = function (id) {
        return this._request({ url: "/users/" + Util_1.Util.resolveID(id) });
    };
    /**
     * Gets the list of bots on this service.
     * @param query The query string that will be used in the request
     */
    TopGG.prototype.getBots = function (query) {
        return this._request({ url: '/bots', params: query });
    };
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    TopGG.prototype.getBot = function (id) {
        return this._request({ url: "/bots/" + Util_1.Util.resolveID(id) });
    };
    /**
     * Gets the bot's stats listed on this service.
     * @param id The bot's ID
     */
    TopGG.prototype.getBotStats = function (id) {
        return this._request({ url: "/bots/" + Util_1.Util.resolveID(id) + "/stats" });
    };
    /**
     * Gets the list of people who voted this bot on this service.
     * @param id The bot's ID
     * @param query The query string that will be used in the request
     */
    TopGG.prototype.getBotVotes = function (id, query) {
        return this._request({
            url: "/bots/" + Util_1.Util.resolveID(id) + "/votes",
            params: query
        });
    };
    /**
     * Checks whether or not a user has voted for a bot on this service.
     * @param id The bot's ID
     * @param userID The user's ID
     */
    TopGG.prototype.userVoted = function (id, userID) {
        return this._request({
            url: "/bots/" + Util_1.Util.resolveID(id) + "/check",
            params: { userId: Util_1.Util.resolveID(userID) }
        });
    };
    /**
     * Gets the widget URL for this bot.
     * @param id The bot's ID
     * @param query The query string that will be used in the request
     * @param smallWidget The sub-path name to turn the widget into a badge (i.e. owner)
     */
    TopGG.prototype.getWidgetURL = function (id, query, smallWidget) {
        var subPath = smallWidget ? smallWidget + "/" : '';
        return this._appendQuery("/widget/" + subPath + Util_1.Util.resolveID(id) + ".svg", query || {});
    };
    return TopGG;
}(Service_1.Service));
exports.default = TopGG;
