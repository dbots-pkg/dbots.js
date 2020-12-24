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
 * Represents the Discord Labs service.
 * @see https://docs.discordlabs.org/docs/api/api
 */
var DiscordLabs = /** @class */ (function (_super) {
    __extends(DiscordLabs, _super);
    function DiscordLabs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DiscordLabs, "aliases", {
        /** The values that can be used to select the service. */
        get: function () {
            return [
                'discordlabs',
                'discord-labs',
                'discordlabs.org',
                'bots.discordlabs.org'
            ];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordLabs, "logoURL", {
        /** The logo URL. */
        get: function () {
            return 'https://avatars2.githubusercontent.com/u/54491479?v=4';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordLabs, "serviceName", {
        /** Service's name. */
        get: function () {
            return 'Discord Labs';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordLabs, "websiteURL", {
        /** The website URL. */
        get: function () {
            return 'https://bots.discordlabs.org/';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordLabs, "baseURL", {
        /** The base URL of the service's API. */
        get: function () {
            return 'https://bots.discordlabs.org/v2';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * @param options The options of the request
     */
    DiscordLabs.post = function (options) {
        var token = options.token, clientID = options.clientID, serverCount = options.serverCount, shard = options.shard;
        return _super._post.call(this, {
            method: 'post',
            url: "/bot/" + Util_1.default.resolveID(clientID) + "/stats",
            data: shard
                ? {
                    token: token,
                    server_count: Util_1.default.resolveCount(serverCount),
                    shard_count: shard.count
                }
                : {
                    token: token,
                    server_count: Util_1.default.resolveCount(serverCount)
                }
        });
    };
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    DiscordLabs.prototype.getBot = function (id) {
        return this._request({ url: "/bot/" + Util_1.default.resolveID(id) });
    };
    return DiscordLabs;
}(ServiceBase_1.default));
exports.default = DiscordLabs;
