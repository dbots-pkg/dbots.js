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
 * Represents the Bots On Discord service.
 * @see https://bots.ondiscord.xyz/info/api
 */
var BotsOnDiscord = /** @class */ (function (_super) {
    __extends(BotsOnDiscord, _super);
    function BotsOnDiscord() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BotsOnDiscord, "aliases", {
        /** The values that can be used to select the service. */
        get: function () {
            return ['botsondiscord', 'bots.ondiscord.xyz', 'bod'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BotsOnDiscord, "logoURL", {
        /** The logo URL. */
        get: function () {
            return 'https://i.olsh.me/icon?size=1..100..500&url=bots.ondiscord.xyz';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BotsOnDiscord, "serviceName", {
        /** Service's name. */
        get: function () {
            return 'Bots On Discord';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BotsOnDiscord, "websiteURL", {
        /** The website URL. */
        get: function () {
            return 'https://bots.ondiscord.xyz';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BotsOnDiscord, "baseURL", {
        /** The base URL of the service's API. */
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
            url: "/bots/" + Util_1.Util.resolveID(clientID) + "/guilds",
            headers: { Authorization: token },
            data: { guildCount: Util_1.Util.resolveCount(serverCount) }
        });
    };
    /**
     * Checks whether or not a user has reviewed a bot.
     * @param id The bot's ID
     * @param userId The user's ID
     */
    BotsOnDiscord.prototype.checkReview = function (id, userId) {
        return this._request({
            url: "/bots/" + Util_1.Util.resolveID(id) + "/review",
            headers: { Authorization: this.token },
            params: { owner: Util_1.Util.resolveID(userId) }
        }, {
            requiresToken: true
        });
    };
    /**
     * Gets the widget URL for this bot.
     * @param id The bot's ID
     * @param query The query string that will be used in the request
     */
    BotsOnDiscord.prototype.getWidgetURL = function (id, query) {
        return this._appendQuery("https://bots.ondiscord.xyz/bots/" + Util_1.Util.resolveID(id) + "/embed", query || {}, false);
    };
    return BotsOnDiscord;
}(Service_1.Service));
exports.default = BotsOnDiscord;
