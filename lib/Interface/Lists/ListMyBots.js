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
 * Represents the List My Bots service.
 * @see https://listmybots.com/docs/api
 */
var ListMyBots = /** @class */ (function (_super) {
    __extends(ListMyBots, _super);
    function ListMyBots() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ListMyBots, "aliases", {
        /** The values that can be used to select the service. */
        get: function () {
            return ['listmybots', 'listmybots.com', 'listmybotscom', 'lmb'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ListMyBots, "logoURL", {
        /** The logo URL. */
        get: function () {
            return 'https://get.snaz.in/5Vm5J7i.png';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ListMyBots, "serviceName", {
        /** Service's name. */
        get: function () {
            return 'List My Bots';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ListMyBots, "websiteURL", {
        /** The website URL. */
        get: function () {
            return 'https://listmybots.com/';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ListMyBots, "baseURL", {
        /** The base URL of the service's API. */
        get: function () {
            return 'https://listmybots.com/api';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * <warn>Shard data posting is not supported for this service.</warn>
     * @param options The options of the request
     */
    ListMyBots.post = function (options) {
        var token = options.token, clientID = options.clientID, serverCount = options.serverCount;
        return _super._post.call(this, {
            method: 'post',
            url: "/bot/" + Util_1.Util.resolveID(clientID),
            headers: { Authorization: token },
            data: { count: Util_1.Util.resolveCount(serverCount) }
        });
    };
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    ListMyBots.prototype.getBot = function (id) {
        return this._request({ url: "/bot/" + Util_1.Util.resolveID(id) });
    };
    /**
     * Gets the status widget URL for this bot.
     * @param id The bot's ID
     * @param query The query string that will be used in the request
     */
    ListMyBots.prototype.getStatusWidgetURL = function (id, query) {
        return this._appendQuery("https://listmybots.com/api/bot/" + Util_1.Util.resolveID(id) + "/widget/status", query || {}, false);
    };
    /**
     * Gets the user listed on this service.
     * @param id The user's ID
     */
    ListMyBots.prototype.getUser = function (id) {
        return this._request({ url: "/user/" + Util_1.Util.resolveID(id) });
    };
    /**
     * Gets the info about someone's bots.
     * @param id The user's ID
     */
    ListMyBots.prototype.getUserBots = function (id) {
        return this._request({ url: "/bots/" + Util_1.Util.resolveID(id) });
    };
    /**
     * Gets the widget URL for this bot.
     * @param id The bot's ID
     * @param query The query string that will be used in the request
     */
    ListMyBots.prototype.getWidgetURL = function (id, query) {
        return this._appendQuery("https://listmybots.com/api/bot/" + Util_1.Util.resolveID(id) + "/widget", query || {}, false);
    };
    return ListMyBots;
}(Service_1.Service));
exports.default = ListMyBots;
