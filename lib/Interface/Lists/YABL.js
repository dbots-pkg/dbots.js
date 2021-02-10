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
 * Represents the YABL service.
 * @see https://yabl.xyz/api
 */
var YABL = /** @class */ (function (_super) {
    __extends(YABL, _super);
    function YABL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(YABL, "aliases", {
        /** The values that can be used to select the service. */
        get: function () {
            return ['yabl', 'yabl.xyz'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YABL, "logoURL", {
        /** The logo URL. */
        get: function () {
            return 'https://i.imgur.com/OFiMern.png';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YABL, "serviceName", {
        /** Service's name. */
        get: function () {
            return 'Yet Another Bot List';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YABL, "websiteURL", {
        /** The website URL. */
        get: function () {
            return 'https://yabl.xyz/';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(YABL, "baseURL", {
        /** The base URL of the service's API. */
        get: function () {
            return 'https://yabl.xyz/api';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * <warn>Shard data posting is not supported for this service.</warn>
     * @param options The options of the request
     */
    YABL.post = function (options) {
        var token = options.token, clientID = options.clientID, serverCount = options.serverCount;
        return _super._post.call(this, {
            method: 'post',
            url: "/bot/" + Util_1.Util.resolveID(clientID) + "/stats",
            headers: { Authorization: token },
            data: { guildCount: Util_1.Util.resolveCount(serverCount) }
        });
    };
    /** Invalidates the token being used in the request. */
    YABL.prototype.invalidate = function () {
        return this._request({
            url: '/token/invalidate',
            headers: { Authorization: this.token }
        }, {
            requiresToken: true
        });
    };
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    YABL.prototype.getBot = function (id) {
        return this._request({ url: "/bot/" + Util_1.Util.resolveID(id) });
    };
    /** Gets 20 random bots from this service. */
    YABL.prototype.getRandomBots = function () {
        return this._request({ url: '/bots' });
    };
    /**
     * Gets the user's bots listed for this service.
     * @param id The user's ID
     */
    YABL.prototype.getUserBots = function (id) {
        return this._request({ url: "/bots/user/" + Util_1.Util.resolveID(id) });
    };
    /** Gets a list of bots on this service. */
    YABL.prototype.getBots = function () {
        return this._request({
            url: '/bots/all',
            headers: { Authorization: this.token }
        }, {
            requiresToken: true
        });
    };
    /**
     * Gets a page of bots on this service.
     * @param query The query string that will be used in the request
     */
    YABL.prototype.getBotsByPage = function (query) {
        return this._request({ url: '/bots/page', params: query });
    };
    /** Gets a list of unverified bots on this service. */
    YABL.prototype.getUnverifiedBots = function () {
        return this._request({
            url: '/bots/unverified',
            headers: { Authorization: this.token }
        }, {
            requiresToken: true
        });
    };
    return YABL;
}(Service_1.Service));
exports.default = YABL;
