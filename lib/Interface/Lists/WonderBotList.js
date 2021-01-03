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
 * Represents the Wonder Bot List service.
 * @see https://api.wonderbotlist.com/en/
 */
var WonderBotList = /** @class */ (function (_super) {
    __extends(WonderBotList, _super);
    function WonderBotList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(WonderBotList, "aliases", {
        /** The values that can be used to select the service. */
        get: function () {
            return [
                'wonderbotlist',
                'wonderbotlist.com',
                'wonderbotlistcom',
                'wonder',
                'wbl'
            ];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WonderBotList, "logoURL", {
        /** The logo URL. */
        get: function () {
            return 'https://get.snaz.in/8Jk3EJg.png';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WonderBotList, "serviceName", {
        /** Service's name. */
        get: function () {
            return 'Wonder Bot List';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WonderBotList, "websiteURL", {
        /** The website URL. */
        get: function () {
            return 'https://wonderbotlist.com/en';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WonderBotList, "baseURL", {
        /** The base URL of the service's API. */
        get: function () {
            return 'https://api.wonderbotlist.com/v1';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * @param options The options of the request
     */
    WonderBotList.post = function (options) {
        var token = options.token, clientID = options.clientID, serverCount = options.serverCount, shard = options.shard;
        return _super._post.call(this, {
            method: 'post',
            url: "/bot/" + Util_1.Util.resolveID(clientID),
            headers: { Authorization: token },
            params: shard && shard.count
                ? { serveurs: Util_1.Util.resolveCount(serverCount), shard: shard.count }
                : { serveurs: Util_1.Util.resolveCount(serverCount) }
        });
    };
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    WonderBotList.prototype.getBot = function (id) {
        return this._request({
            url: "/bot/" + Util_1.Util.resolveID(id),
            headers: { Authorization: this.token }
        }, {
            requiresToken: true
        });
    };
    /**
     * Gets the user listed on this service.
     * @param id The user's ID
     */
    WonderBotList.prototype.getUser = function (id) {
        return this._request({
            url: "/user/" + Util_1.Util.resolveID(id),
            headers: { Authorization: this.token }
        }, {
            requiresToken: true
        });
    };
    return WonderBotList;
}(Service_1.Service));
exports.default = WonderBotList;
