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
 * Represents the DBots service.
 * @see https://docs.dbots.co/
 */
var DBots = /** @class */ (function (_super) {
    __extends(DBots, _super);
    function DBots() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DBots, "aliases", {
        /** The values that can be used to select the service. */
        get: function () {
            return ['dbots', 'dbots.co'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DBots, "logoURL", {
        /** The logo URL. */
        get: function () {
            return 'https://gblobscdn.gitbook.com/spaces%2F-MO490c2KMEgwyXnbtbV%2Favatar-1607528014691.png';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DBots, "serviceName", {
        /** Service's name. */
        get: function () {
            return 'DBots.co';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DBots, "websiteURL", {
        /** The website URL. */
        get: function () {
            return 'https://dbots.co/';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DBots, "baseURL", {
        /** The base URL of the service's API. */
        get: function () {
            return 'https://dbots.co/api/v1';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * <warn>Shard data posting is not supported for this service.</warn>
     * @param options The options of the request
     */
    DBots.post = function (options) {
        var token = options.token, clientID = options.clientID, serverCount = options.serverCount;
        return _super._post.call(this, {
            method: 'post',
            url: "/bots/" + Util_1.Util.resolveID(clientID) + "/stats",
            headers: { Authorization: token },
            data: { guildCount: Util_1.Util.resolveCount(serverCount) }
        });
    };
    /**
     * Gets the bot's audit logs.
     * @param id The bot's ID
     */
    DBots.prototype.getAudit = function (id) {
        return this._request({
            url: "/bots/" + Util_1.Util.resolveID(id) + "/log",
            headers: { Authorization: this.token }
        }, { requiresToken: true });
    };
    /**
     * Regenerates the bot API token.
     * @param id The bot's ID
     */
    DBots.prototype.regenToken = function (id) {
        return this._request({
            url: "/bots/" + Util_1.Util.resolveID(id) + "/keys/regen",
            headers: { Authorization: this.token }
        }, { requiresToken: true });
    };
    return DBots;
}(Service_1.Service));
exports.default = DBots;
