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
            return ['ibl', 'infinitybotlist', 'infinitybotlist.com'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InfinityBotList, "logoURL", {
        /** The logo URL. */
        get: function () {
            return 'https://cdn.bot-list.xyz/7364djcas.png';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InfinityBotList, "serviceName", {
        /** Service's name. */
        get: function () {
            return 'Astro Bot List';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InfinityBotList, "websiteURL", {
        /** The website URL. */
        get: function () {
            return 'https://botlists.com';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InfinityBotList, "baseURL", {
        /** The base URL of the service's API. */
        get: function () {
            return 'https://botlists.com/api';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * @param options The options of the request
     */
    InfinityBotList.post = function (options) {
        var token = options.token, serverCount = options.serverCount;
        return _super._post.call(this, {
            method: 'post',
            url: '/bot',
            headers: { token: token },
            data: {
                guild_count: Util_1.Util.resolveCount(serverCount)
            }
        });
    };
    /** Gets the stats of this bot. */
    InfinityBotList.prototype.getOwnStats = function () {
        return this._request({
            url: '/bot',
            headers: { token: this.token }
        }, {
            requiresToken: true
        });
    };
    return InfinityBotList;
}(Service_1.Service));
exports.default = InfinityBotList;
