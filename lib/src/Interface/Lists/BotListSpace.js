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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ServiceBase_1 = __importDefault(require("../ServiceBase"));
var Util_1 = __importDefault(require("../../Utils/Util"));
/**
 * Represents the botlist.space service.
 * @see https://docs.botlist.space/
 */
var BotListSpace = /** @class */ (function (_super) {
    __extends(BotListSpace, _super);
    function BotListSpace() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BotListSpace, "aliases", {
        /** The values that can be used to select the service. */
        get: function () {
            return ['botlistspace', 'botlist.space', 'bls'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BotListSpace, "logoURL", {
        /** The logo URL. */
        get: function () {
            return 'https://i.olsh.me/icon?size=1..100..500&url=botlist.space';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BotListSpace, "serviceName", {
        /** Service's name. */
        get: function () {
            return 'botlist.space';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BotListSpace, "websiteURL", {
        /** The website URL. */
        get: function () {
            return 'https://botlist.space';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BotListSpace, "baseURL", {
        /** The base URL of the service's API. */
        get: function () {
            return 'https://api.botlist.space/v1';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * <warn>Shard data posting is not supported for this service.</warn>
     * @param options The options of the request
     */
    BotListSpace.post = function (options) {
        var token = options.token, clientID = options.clientID, serverCount = options.serverCount;
        return _super._post.call(this, {
            method: 'post',
            url: "/bots/" + Util_1.default.resolveID(clientID),
            headers: { Authorization: token },
            data: { server_count: Util_1.default.resolveCount(serverCount) }
        });
    };
    /** Gets the statistics of this service. */
    BotListSpace.prototype.getStatistics = function () {
        return this._request({ url: '/statistics' });
    };
    /** Gets a list of bots on this service. */
    BotListSpace.prototype.getBots = function () {
        return this._request({ url: '/bots' });
    };
    /** Gets the bot listed on this service. */
    BotListSpace.prototype.getBot = function (id) {
        return this._request({ url: "/bots/" + Util_1.default.resolveID(id) });
    };
    /**
     * Gets the list of people who voted this bot on this service.
     * @param id The bot's ID
     */
    BotListSpace.prototype.getBotVotes = function (id) {
        return this._request({
            url: "/bots/" + Util_1.default.resolveID(id) + "/upvotes",
            headers: { Authorization: this.token }
        }, {
            requiresToken: true
        });
    };
    /**
     * Gets the uptime of a bot listed on this service.
     * @param id The bot's ID
     */
    BotListSpace.prototype.getBotUptime = function (id) {
        return this._request({ url: "/bots/" + Util_1.default.resolveID(id) + "/uptime" });
    };
    /**
     * Gets the user listed on this service.
     * @param id The user's ID
     */
    BotListSpace.prototype.getUser = function (id) {
        return this._request({ url: "/users/" + Util_1.default.resolveID(id) });
    };
    /**
     * Gets the user's bots listed for this service.
     * @param id The user's ID
     */
    BotListSpace.prototype.getUserBots = function (id) {
        return this._request({ url: "/users/" + Util_1.default.resolveID(id) + "/bots" });
    };
    /**
     * Gets the widget URL for this bot.
     * @param id The bot's ID
     * @param style The style of the widget, cannot be zero
     * @param query The query string that will be used in the request
     */
    BotListSpace.prototype.getWidgetURL = function (id, style, query) {
        if (style === void 0) { style = 1; }
        if (query === void 0) { query = {}; }
        return this._appendQuery("https://api.botlist.space/widget/" + Util_1.default.resolveID(id) + "/" + Util_1.default.resolveCount(style), query, false);
    };
    return BotListSpace;
}(ServiceBase_1.default));
exports.default = BotListSpace;
