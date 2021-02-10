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
 * Represents the Astro Bot List service.
 * @see https://botlists.com/api/docs
 */
var AstroBotList = /** @class */ (function (_super) {
    __extends(AstroBotList, _super);
    function AstroBotList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AstroBotList, "aliases", {
        /** The values that can be used to select the service. */
        get: function () {
            return ['astrobotlist', 'botlists.com'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstroBotList, "logoURL", {
        /** The logo URL. */
        get: function () {
            return 'https://cdn.bot-list.xyz/7364djcas.png';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstroBotList, "serviceName", {
        /** Service's name. */
        get: function () {
            return 'Astro Bot List';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstroBotList, "websiteURL", {
        /** The website URL. */
        get: function () {
            return 'https://botlists.com';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstroBotList, "baseURL", {
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
    AstroBotList.post = function (options) {
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
    AstroBotList.prototype.getOwnStats = function () {
        return this._request({
            url: '/bot',
            headers: { token: this.token }
        }, {
            requiresToken: true
        });
    };
    return AstroBotList;
}(Service_1.Service));
exports.default = AstroBotList;
