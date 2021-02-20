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
 * Represents the Bots For Discord service.
 * @see https://docs.botsfordiscord.com/
 */
var BotsForDiscord = /** @class */ (function (_super) {
    __extends(BotsForDiscord, _super);
    function BotsForDiscord() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BotsForDiscord, "aliases", {
        /** The values that can be used to select the service. */
        get: function () {
            return ['botsfordiscord', 'botsfordiscord.com'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BotsForDiscord, "logoURL", {
        /** The logo URL. */
        get: function () {
            return 'https://botsfordiscord.com/img/manifest/icon-512x512.png';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BotsForDiscord, "serviceName", {
        /** Service's name. */
        get: function () {
            return 'Bots For Discord';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BotsForDiscord, "websiteURL", {
        /** The website URL. */
        get: function () {
            return 'https://botsfordiscord.com';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BotsForDiscord, "baseURL", {
        /** The base URL of the service's API. */
        get: function () {
            return 'https://botsfordiscord.com/api';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * <warn>Shard data posting is not supported for this service.</warn>
     * @param options The options of the request
     */
    BotsForDiscord.post = function (options) {
        var token = options.token, clientID = options.clientID, serverCount = options.serverCount;
        return _super._post.call(this, {
            method: 'post',
            url: "/bot/" + Util_1.Util.resolveID(clientID),
            headers: { Authorization: token },
            data: { server_count: Util_1.Util.resolveCount(serverCount) }
        });
    };
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    BotsForDiscord.prototype.getBot = function (id) {
        return this._request({ url: "/bot/" + Util_1.Util.resolveID(id) });
    };
    /**
     * Gets the list of people who voted this bot on this service.
     * @param id The bot's ID
     */
    BotsForDiscord.prototype.getBotVotes = function (id) {
        return this._request({ url: "/bot/" + Util_1.Util.resolveID(id) + "/votes" });
    };
    /**
     * Gets the user listed on this service.
     * @param id The user's ID
     */
    BotsForDiscord.prototype.getUser = function (id) {
        return this._request({ url: "/user/" + Util_1.Util.resolveID(id) });
    };
    /**
     * Gets the user's bots listed for this service.
     * @param id The user's ID
     */
    BotsForDiscord.prototype.getUserBots = function (id) {
        return this._request({ url: "/user/" + Util_1.Util.resolveID(id) + "/bots" });
    };
    /**
     * Gets the widget URL for this bot.
     * @param id The bot's ID
     * @param query The query string that will be used in the request
     */
    BotsForDiscord.prototype.getWidgetURL = function (id, query) {
        return this._appendQuery("/bot/" + Util_1.Util.resolveID(id) + "/widget", query || {});
    };
    return BotsForDiscord;
}(Service_1.Service));
exports.default = BotsForDiscord;
