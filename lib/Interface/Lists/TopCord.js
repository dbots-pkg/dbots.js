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
 * Represents the TopCord service.
 * @see https://docs.topcord.xyz/#/API
 */
var TopCord = /** @class */ (function (_super) {
    __extends(TopCord, _super);
    function TopCord() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TopCord, "aliases", {
        get: function () {
            return ['topcord', 'topcord.xyz'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TopCord, "logoURL", {
        get: function () {
            return 'https://avatars0.githubusercontent.com/u/69593894?v=4';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TopCord, "serviceName", {
        get: function () {
            return 'TopCord';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TopCord, "websiteURL", {
        get: function () {
            return 'https://topcord.xyz/';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TopCord, "baseURL", {
        get: function () {
            return 'https://topcord.xyz/api';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * @param options The options of the request
     */
    TopCord.post = function (options) {
        var token = options.token, clientID = options.clientID, serverCount = options.serverCount, shard = options.shard;
        return _super._post.call(this, {
            method: 'post',
            url: "/bot/stats/" + Util_1.default.resolveID(clientID),
            headers: { Authorization: token },
            data: shard ?
                {
                    guilds: Util_1.default.resolveCount(serverCount),
                    shards: shard.count
                } :
                { guilds: Util_1.default.resolveCount(serverCount) }
        });
    };
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    TopCord.prototype.getBot = function (id) {
        return this._request({ url: "/bot/" + Util_1.default.resolveID(id) });
    };
    return TopCord;
}(ServiceBase_1.default));
exports.default = TopCord;
