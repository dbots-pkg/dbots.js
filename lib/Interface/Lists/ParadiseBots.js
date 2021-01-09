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
 * Represents the Paradise Bots service.
 * @see https://paradisebots.net/api/v1/docs
 */
var ParadiseBots = /** @class */ (function (_super) {
    __extends(ParadiseBots, _super);
    function ParadiseBots() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ParadiseBots, "aliases", {
        /** The values that can be used to select the service. */
        get: function () {
            return ['paradise', 'paradisebots', 'paradisebots.net', 'pb'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParadiseBots, "logoURL", {
        /** The logo URL. */
        get: function () {
            return 'https://i.imgur.com/Df2seyl.png';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParadiseBots, "serviceName", {
        /** Service's name. */
        get: function () {
            return 'Paradise Bots';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParadiseBots, "websiteURL", {
        /** The website URL. */
        get: function () {
            return 'https://paradisebots.net/';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParadiseBots, "baseURL", {
        /** The base URL of the service's API. */
        get: function () {
            return 'https://paradisebots.net/api/v1';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * @param options The options of the request
     */
    ParadiseBots.post = function (options) {
        var token = options.token, clientID = options.clientID, serverCount = options.serverCount, shard = options.shard;
        return _super._post.call(this, {
            method: 'post',
            url: "/bot/" + Util_1.Util.resolveID(clientID),
            headers: {
                Authorization: token
            },
            data: __assign({ server_count: Util_1.Util.resolveCount(serverCount) }, ((shard === null || shard === void 0 ? void 0 : shard.count) ? {
                shard_count: Util_1.Util.resolveCount(shard.count)
            }
                : {}))
        });
    };
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    ParadiseBots.prototype.getBot = function (id) {
        return this._request({ url: "/bots/" + Util_1.Util.resolveID(id) });
    };
    return ParadiseBots;
}(Service_1.Service));
exports.default = ParadiseBots;
