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
 * Represents the Blist service.
 * @see https://blist.xyz/docs/
 */
var Blist = /** @class */ (function (_super) {
    __extends(Blist, _super);
    function Blist() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Blist, "aliases", {
        /** The values that can be used to select the service. */
        get: function () {
            return ['blist', 'blist.xyz'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Blist, "logoURL", {
        /** The logo URL. */
        get: function () {
            return 'https://blist.xyz/main_site/staticfiles/main/assets/blist.png';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Blist, "serviceName", {
        /** Service's name. */
        get: function () {
            return 'Blist';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Blist, "websiteURL", {
        /** The website URL. */
        get: function () {
            return 'https://blist.xyz';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Blist, "baseURL", {
        /** The base URL of the service's API. */
        get: function () {
            return 'https://blist.xyz/api';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * @param {Object} options The options of the request
     */
    Blist.post = function (options) {
        var token = options.token, clientID = options.clientID, serverCount = options.serverCount, shard = options.shard;
        return _super._post.call(this, {
            method: 'post',
            url: "/bot/" + Util_1.default.resolveID(clientID) + "/stats/",
            headers: { Authorization: token },
            data: shard
                ? {
                    server_count: Util_1.default.resolveCount(serverCount),
                    shard_count: shard.count
                }
                : { server_count: Util_1.default.resolveCount(serverCount) }
        });
    };
    /**
     * Gets the user listed on this service.
     * @param id The user's ID
     */
    Blist.prototype.getUser = function (id) {
        return this._request({ url: "/user/" + Util_1.default.resolveID(id) });
    };
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    Blist.prototype.getBot = function (id) {
        return this._request({ url: "/bot/" + Util_1.default.resolveID(id) + "/stats" });
    };
    /**
     * Gets the list of people who voted this bot on this service.
     * @param id The bot's ID
     */
    Blist.prototype.getBotVotes = function (id) {
        return this._request({
            url: "/bot/" + Util_1.default.resolveID(id) + "/votes",
            headers: { Authorization: this.token }
        }, {
            requiresToken: true
        });
    };
    /**
     * Gets the widget URL for this bot.
     * @param id The bot's ID
     * @param query The query string that will be used in the request
     */
    Blist.prototype.getWidgetURL = function (id, query) {
        var actualQuery = Object.assign({ type: 'normal' }, query);
        return this._appendQuery("/bot/" + Util_1.default.resolveID(id) + "/widget", actualQuery);
    };
    return Blist;
}(ServiceBase_1.default));
exports.default = Blist;
