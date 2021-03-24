"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Service_1 = require("../Service");
var Util_1 = require("../../Utils/Util");
/**
 * Represents the TopCord service.
 * @see https://docs.topcord.xyz/#/API
 */
var TopCord = /** @class */ (function (_super) {
    __extends(TopCord, _super);
    function TopCord() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TopCord, "aliases", {
        /** The values that can be used to select the service. */
        get: function () {
            return ['topcord', 'topcord.xyz'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TopCord, "logoURL", {
        /** The logo URL. */
        get: function () {
            return 'https://avatars0.githubusercontent.com/u/69593894?v=4';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TopCord, "serviceName", {
        /** Service's name. */
        get: function () {
            return 'TopCord';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TopCord, "websiteURL", {
        /** The website URL. */
        get: function () {
            return 'https://topcord.xyz/';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TopCord, "baseURL", {
        /** The base URL of the service's API. */
        get: function () {
            return 'https://api.topcord.xyz';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * @param options The options of the request
     */
    TopCord.post = function (options) {
        var token = options.token, clientID = options.clientID, serverCount = options.serverCount, shard = options.shard;
        return _super._post.call(this, {
            method: 'post',
            url: "/bot/" + Util_1.Util.resolveID(clientID) + "/stats",
            headers: { Authorization: token },
            data: shard
                ? {
                    guilds: Util_1.Util.resolveCount(serverCount),
                    shards: shard.count
                }
                : { guilds: Util_1.Util.resolveCount(serverCount) }
        });
    };
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    TopCord.prototype.getBot = function (id) {
        return this._request({ url: "/bot/" + Util_1.Util.resolveID(id) });
    };
    /**
     * Lists every bot on this service.
     */
    TopCord.prototype.getBots = function () {
        return this._request({ url: "/bots" });
    };
    return TopCord;
}(Service_1.Service));
exports.default = TopCord;
