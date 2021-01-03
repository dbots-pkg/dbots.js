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
 * Represents the Mythical Bots service.
 * @see https://docs.mythicalbots.xyz/
 */
var MythicalBots = /** @class */ (function (_super) {
    __extends(MythicalBots, _super);
    function MythicalBots() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MythicalBots, "aliases", {
        /** The values that can be used to select the service. */
        get: function () {
            return ['mythicalbots', 'mythicalbots.xyz', 'mythicalbotsxyz', 'mythical'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MythicalBots, "logoURL", {
        /** The logo URL. */
        get: function () {
            return 'https://get.snaz.in/2PGqLVM.png';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MythicalBots, "serviceName", {
        /** Service's name. */
        get: function () {
            return 'Mythical Bots';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MythicalBots, "websiteURL", {
        /** The website URL. */
        get: function () {
            return 'https://mythicalbots.xyz/';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MythicalBots, "baseURL", {
        /** The base URL of the service's API. */
        get: function () {
            return 'https://mythicalbots.xyz/api';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * <warn>Shard data posting is not supported for this service.</warn>
     * @param options The options of the request
     */
    MythicalBots.post = function (options) {
        var token = options.token, clientID = options.clientID, serverCount = options.serverCount;
        return _super._post.call(this, {
            method: 'post',
            url: "/bot/" + Util_1.Util.resolveID(clientID) + "/stats",
            headers: { Authorization: token },
            data: { server_count: Util_1.Util.resolveCount(serverCount) }
        });
    };
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    MythicalBots.prototype.getBot = function (id) {
        return this._request({ url: "/bot/" + Util_1.Util.resolveID(id) + "/info" });
    };
    /**
     * Gets the user listed on this service.
     * @param id The user's ID
     */
    MythicalBots.prototype.getUser = function (id) {
        return this._request({ url: "/user/" + Util_1.Util.resolveID(id) + "/info" });
    };
    /**
     * Gets the widget URL for this bot.
     * @param id The bot's ID
     * @param query The query string that will be used in the request
     */
    MythicalBots.prototype.getWidgetURL = function (id, query) {
        return this._appendQuery("https://mythicalbots.xyz/bot/" + Util_1.Util.resolveID(id) + "/embed", query || {}, false);
    };
    return MythicalBots;
}(Service_1.Service));
exports.default = MythicalBots;
