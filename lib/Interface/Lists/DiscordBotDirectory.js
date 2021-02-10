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
 * Represents the Discord Bot Directory service.
 * @see https://botblock.org/lists/discordbotdirectory.net
 */
var DiscordBotDirectory = /** @class */ (function (_super) {
    __extends(DiscordBotDirectory, _super);
    function DiscordBotDirectory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DiscordBotDirectory, "aliases", {
        /** The values that can be used to select the service. */
        get: function () {
            return ['discordbotdirectory', 'discordbotdirectory.net'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordBotDirectory, "logoURL", {
        /** The logo URL. */
        get: function () {
            return 'https://discordbotdirectory.net/assets/img/logo.png';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordBotDirectory, "serviceName", {
        /** Service's name. */
        get: function () {
            return 'Discord Bot Directory';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordBotDirectory, "websiteURL", {
        /** The website URL. */
        get: function () {
            return 'https://discordbotdirectory.net';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordBotDirectory, "baseURL", {
        /** The base URL of the service's API. */
        get: function () {
            return 'https://discordbotdirectory.net/api';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * <warn>The docs for this endopoint exist only in a Discord message.
     * Shard data posting is not supported for this service.</warn>
     * @param options The options of the request
     */
    DiscordBotDirectory.post = function (options) {
        var token = options.token, clientID = options.clientID, serverCount = options.serverCount;
        return _super._post.call(this, {
            method: 'post',
            url: "/auth/stats/" + Util_1.Util.resolveID(clientID),
            headers: { authorization: token, 'Content-Type': 'application/json' },
            data: { server_count: Util_1.Util.resolveCount(serverCount) }
        });
    };
    /**
     * Gets the widget URL for this bot.
     * @param id The bot's ID
     */
    DiscordBotDirectory.prototype.getWidgetURL = function (id) {
        return this._appendQuery("/embed/" + Util_1.Util.resolveID(id), {});
    };
    return DiscordBotDirectory;
}(Service_1.Service));
exports.default = DiscordBotDirectory;
