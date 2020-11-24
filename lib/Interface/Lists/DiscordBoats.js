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
 * Represents the Discord Boats service.
 * @see https://discord.boats/api/docs
 */
var DiscordBoats = /** @class */ (function (_super) {
    __extends(DiscordBoats, _super);
    function DiscordBoats() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DiscordBoats, "aliases", {
        get: function () {
            return ['discordboats', 'discord.boats', 'dboats'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordBoats, "logoURL", {
        get: function () {
            return 'https://i.olsh.me/icon?size=1..100..500&url=discord.boats';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordBoats, "serviceName", {
        get: function () {
            return 'Discord Boats';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordBoats, "websiteURL", {
        get: function () {
            return 'https://discord.boats';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordBoats, "baseURL", {
        get: function () {
            return 'https://discord.boats/api/v2';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * <warn>Shard data posting is not supported for this service.</warn>
     * @param options The options of the request
     */
    DiscordBoats.post = function (options) {
        var token = options.token, clientID = options.clientID, serverCount = options.serverCount;
        return _super._post.call(this, {
            method: 'post',
            url: "/bot/" + Util_1.default.resolveID(clientID),
            headers: { Authorization: token },
            data: { server_count: Util_1.default.resolveCount(serverCount) }
        });
    };
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    DiscordBoats.prototype.getBot = function (id) {
        return this._request({ url: "/bot/" + Util_1.default.resolveID(id) });
    };
    /**
     * Gets the user listed on this service.
     * @param id The user's ID
     */
    DiscordBoats.prototype.getUser = function (id) {
        return this._request({ url: "/user/" + Util_1.default.resolveID(id) });
    };
    /**
     * Checks whether or not a user has voted for a bot on this service.
     * @param id The bot's ID
     * @param userID The user's ID
     */
    DiscordBoats.prototype.userVoted = function (id, userID) {
        return this._request({
            url: "/bot/" + Util_1.default.resolveID(id) + "/voted",
            params: { id: Util_1.default.resolveID(userID) }
        });
    };
    /**
     * Gets the widget URL for this bot.
     * @param id The bot's ID
     * @param query The query string that will be used in the request
     */
    DiscordBoats.prototype.getWidgetURL = function (id, query) {
        return this._appendQuery("/widget/" + Util_1.default.resolveID(id), query || {});
    };
    return DiscordBoats;
}(ServiceBase_1.default));
exports.default = DiscordBoats;
