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
 * Represents the DiscordBots.co service.
 * @see https://discordbots.co/api
 */
var DiscordBotsCo = /** @class */ (function (_super) {
    __extends(DiscordBotsCo, _super);
    function DiscordBotsCo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DiscordBotsCo, "aliases", {
        get: function () {
            return ['discordbotsco'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordBotsCo, "logoURL", {
        get: function () {
            return 'https://cdn.discordapp.com/avatars/688927563409522694/17cfd572fd3e2d3285534c12e0f58422.png';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordBotsCo, "serviceName", {
        get: function () {
            return 'DiscordBots.co';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordBotsCo, "websiteURL", {
        get: function () {
            return 'https://discordbots.co';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordBotsCo, "baseURL", {
        get: function () {
            return 'https://api.discordbots.co/v1/public';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * @param options The options of the request
     */
    DiscordBotsCo.post = function (options) {
        var token = options.token, clientID = options.clientID, serverCount = options.serverCount, shard = options.shard;
        return _super._post.call(this, {
            method: 'post',
            url: "/bot/" + Util_1.default.resolveID(clientID) + "/stats",
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            data: shard
                ? {
                    serverCount: Util_1.default.resolveCount(serverCount),
                    shardCount: shard.count,
                }
                : { serverCount: Util_1.default.resolveCount(serverCount) },
        });
    };
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    DiscordBotsCo.prototype.getBot = function (id) {
        return this._request({
            url: "/bot/" + Util_1.default.resolveID(id),
            headers: { Authorization: this.token },
        }, {
            requiresToken: true,
        });
    };
    return DiscordBotsCo;
}(ServiceBase_1.default));
exports.default = DiscordBotsCo;
