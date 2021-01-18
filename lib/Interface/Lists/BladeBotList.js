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
 * Represents the BladeBotList service.
 * @see https://docs.bladebotlist.xyz/api/introduction.html
 */
var BladeBotList = /** @class */ (function (_super) {
    __extends(BladeBotList, _super);
    function BladeBotList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BladeBotList, "aliases", {
        /** The values that can be used to select the service. */
        get: function () {
            return ['bladebotlist', 'bladebotlist.xyz', 'bbl'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BladeBotList, "logoURL", {
        /** The logo URL. */
        get: function () {
            return 'https://bladebotlist.xyz/img/logo.svg';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BladeBotList, "serviceName", {
        /** Service's name. */
        get: function () {
            return 'BladeBotList';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BladeBotList, "websiteURL", {
        /** The website URL. */
        get: function () {
            return 'https://bladebotlist.xyz';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BladeBotList, "baseURL", {
        /** The base URL of the service's API. */
        get: function () {
            return 'https://bladebotlist.xyz/api/';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * @param {Object} options The options of the request
     */
    BladeBotList.post = function (options) {
        var token = options.token, clientID = options.clientID, serverCount = options.serverCount, shard = options.shard;
        return _super._post.call(this, {
            method: 'post',
            url: "/bots/" + Util_1.Util.resolveID(clientID) + "/stats/",
            headers: { Authorization: token },
            data: shard
                ? {
                    server_count: Util_1.Util.resolveCount(serverCount),
                    shard_count: shard.count
                }
                : { server_count: Util_1.Util.resolveCount(serverCount) }
        });
    };
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    BladeBotList.prototype.getBot = function (id) {
        return this._request({ url: "/bots/" + Util_1.Util.resolveID(id) });
    };
    /**
     * Checks whether a user has given a vote to the bot
     * @param botId The bot's ID
     * @param userID The user's ID
     */
    BladeBotList.prototype.userVoted = function (botId, userID) {
        return this._request({
            url: "/bots/" + Util_1.Util.resolveID(botId) + "/votes/" + Util_1.Util.resolveID(userID)
        });
    };
    return BladeBotList;
}(Service_1.Service));
exports.default = BladeBotList;
