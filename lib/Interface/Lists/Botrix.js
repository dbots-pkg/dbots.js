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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Service_1 = require("../Service");
var Util_1 = require("../../Utils/Util");
/**
 * Represents the Botrix List service.
 * @see https://docs.botrix.cc/
 */
var Botrix = /** @class */ (function (_super) {
    __extends(Botrix, _super);
    function Botrix() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Botrix, "aliases", {
        /** The values that can be used to select the service. */
        get: function () {
            return ['btorix', 'botrix.cc'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Botrix, "logoURL", {
        /** The logo URL. */
        get: function () {
            return 'https://media.discordapp.net/attachments/748427107968745512/810018388126597120/botrix_swirl.png';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Botrix, "serviceName", {
        /** Service's name. */
        get: function () {
            return 'Botrix';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Botrix, "websiteURL", {
        /** The website URL. */
        get: function () {
            return 'https://botrix.cc/';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Botrix, "baseURL", {
        /** The base URL of the service's API. */
        get: function () {
            return 'https://botrix.cc/api/v1';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * @param options The options of the request
     */
    Botrix.post = function (options) {
        var clientID = options.clientID, /* token,*/ serverCount = options.serverCount, shard = options.shard, userCount = options.userCount;
        return _super._post.call(this, {
            method: 'post',
            url: "/bot/" + Util_1.Util.resolveID(clientID),
            // As of now, the API has no tokens...
            // headers: {
            //   authorization: token
            // },
            data: __assign({ servers: Util_1.Util.resolveCount(serverCount), users: Util_1.Util.resolveCount(userCount) }, ((shard === null || shard === void 0 ? void 0 : shard.count) ? {
                shards: Util_1.Util.resolveCount(shard.count)
            }
                : {}))
        });
    };
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    Botrix.prototype.getBot = function (id) {
        return this._request({
            url: "/bot/" + Util_1.Util.resolveID(id)
        });
    };
    /**
     * Checks whether or not a user has voted for a bot on this service.
     * @param id The bot's ID
     * @param userID The user's ID
     */
    Botrix.prototype.userVoted = function (id, userID) {
        return this._request({
            url: "/voted/" + Util_1.Util.resolveID(id) + "/" + Util_1.Util.resolveID(userID)
        });
    };
    return Botrix;
}(Service_1.Service));
exports.default = Botrix;
