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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Service_1 = require("../Service");
var Util_1 = require("../../Utils/Util");
/**
 * Represents the Infinity Bot List service.
 * @see https://infinitybotlist.com/docs
 */
var InfinityBotList = /** @class */ (function (_super) {
    __extends(InfinityBotList, _super);
    function InfinityBotList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(InfinityBotList, "aliases", {
        /** The values that can be used to select the service. */
        get: function () {
            return ['infinitybotlist', 'infinitybotlist.com'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InfinityBotList, "logoURL", {
        /** The logo URL. */
        get: function () {
            return 'https://i.imgur.com/x0LCfAh.png';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InfinityBotList, "serviceName", {
        /** Service's name. */
        get: function () {
            return 'Infinity Bot List';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InfinityBotList, "websiteURL", {
        /** The website URL. */
        get: function () {
            return 'https://infinitybotlist.com';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InfinityBotList, "baseURL", {
        /** The base URL of the service's API. */
        get: function () {
            return 'https://infinitybotlist.com/api';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * @param options The options of the request
     */
    InfinityBotList.post = function (options) {
        var clientID = options.clientID, token = options.token, serverCount = options.serverCount, shard = options.shard;
        return _super._post.call(this, {
            method: 'post',
            url: "/bots/" + Util_1.Util.resolveID(clientID),
            headers: {
                authorization: token,
                'Content-Type': 'application/json'
            },
            data: __assign({ servers: Util_1.Util.resolveCount(serverCount) }, ((shard === null || shard === void 0 ? void 0 : shard.count) ? {
                shards: Util_1.Util.resolveCount(shard.count)
            }
                : {}))
        });
    };
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    InfinityBotList.prototype.getBot = function (id) {
        return this._request({
            url: "/bots/" + Util_1.Util.resolveID(id) + "/info",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };
    /**
     * Gets the user listed on this service.
     * @param id The user's ID
     */
    InfinityBotList.prototype.getUser = function (id) {
        return this._request({
            url: "/users/" + Util_1.Util.resolveID(id),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };
    return InfinityBotList;
}(Service_1.Service));
exports.default = InfinityBotList;
