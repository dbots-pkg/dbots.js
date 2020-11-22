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
 * Represents the Bots On Discord service.
 * @see https://bots.ondiscord.xyz/info/api
 */
var BotsOnDiscord = /** @class */ (function (_super) {
    __extends(BotsOnDiscord, _super);
    function BotsOnDiscord() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BotsOnDiscord, "aliases", {
        get: function () {
            return ['botsondiscord', 'bots.ondiscord.xyz', 'bod'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BotsOnDiscord, "logoURL", {
        get: function () {
            return 'https://i.olsh.me/icon?size=1..100..500&url=bots.ondiscord.xyz';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BotsOnDiscord, "serviceName", {
        get: function () {
            return 'Bots On Discord';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BotsOnDiscord, "websiteURL", {
        get: function () {
            return 'https://bots.ondiscord.xyz';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BotsOnDiscord, "baseURL", {
        get: function () {
            return 'https://bots.ondiscord.xyz/bot-api';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * <warn>Shard data posting is not supported for this service.</warn>
     * @param options The options of the request
     */
    BotsOnDiscord.post = function (options) {
        var token = options.token, clientID = options.clientID, serverCount = options.serverCount;
        return _super._post.call(this, {
            method: 'post',
            url: "/bots/" + Util_1.default.resolveID(clientID) + "/guilds",
            headers: { Authorization: token },
            data: { guildCount: Util_1.default.resolveCount(serverCount) },
        });
    };
    /**
     * Checks whether or not a user has reviewed a bot.
     * @param id The bot's ID
     * @param userId The user's ID
     */
    BotsOnDiscord.prototype.checkReview = function (id, userId) {
        return this._request({
            url: "/bots/" + Util_1.default.resolveID(id) + "/review",
            headers: { Authorization: this.token },
            params: { owner: Util_1.default.resolveID(userId) },
        }, {
            requiresToken: true,
        });
    };
    /**
     * Gets the widget URL for this bot.
     * @param id The bot's ID
     * @param query The query string that will be used in the request
     */
    BotsOnDiscord.prototype.getWidgetURL = function (id, query) {
        return this._appendQuery("https://bots.ondiscord.xyz/bots/" + Util_1.default.resolveID(id) + "/embed", query || {}, false);
    };
    return BotsOnDiscord;
}(ServiceBase_1.default));
exports.default = BotsOnDiscord;
