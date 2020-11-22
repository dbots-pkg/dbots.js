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
 * Represents the Discord Apps service.
 * @see https://discordapps.dev/en-GB/posts/docs/api-v2/
 */
var DiscordAppsDev = /** @class */ (function (_super) {
    __extends(DiscordAppsDev, _super);
    function DiscordAppsDev() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DiscordAppsDev, "aliases", {
        get: function () {
            return ['discordappsdev', 'discordapps.dev', 'discordapps', 'dapps'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordAppsDev, "logoURL", {
        get: function () {
            return 'https://api.discordapps.dev/img/logo/logo128.png';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordAppsDev, "serviceName", {
        get: function () {
            return 'Discord Apps';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordAppsDev, "websiteURL", {
        get: function () {
            return 'https://discordapps.dev';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordAppsDev, "baseURL", {
        get: function () {
            return 'https://api.discordapps.dev/api/v2';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * <warn>Shard data posting is not supported for this service.</warn>
     * @param options The options of the request
     */
    DiscordAppsDev.post = function (options) {
        var token = options.token, clientID = options.clientID, serverCount = options.serverCount;
        return _super._post.call(this, {
            method: 'post',
            url: "/bots/" + Util_1.default.resolveID(clientID),
            headers: { Authorization: token },
            data: { bot: { count: Util_1.default.resolveCount(serverCount) } },
        });
    };
    /** Gets a list of bots on this service. */
    DiscordAppsDev.prototype.getBots = function () {
        return this._request({ url: '/bots' });
    };
    /** Gets a list of applications on this service. */
    DiscordAppsDev.prototype.getApps = function () {
        return this._request({ url: '/apps' });
    };
    /** Gets a list of RPC applications on this service. */
    DiscordAppsDev.prototype.getRPCApps = function () {
        return this._request({ url: '/rpc' });
    };
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    DiscordAppsDev.prototype.getBot = function (id) {
        return this._request({ url: "/bots/" + Util_1.default.resolveID(id) });
    };
    /**
     * Updates the bot with the data provided.
     * @param id The bot's ID
     * @param data The data being posted
     */
    DiscordAppsDev.prototype.updateBot = function (id, data) {
        return this._request({
            method: 'post',
            url: "/bots/" + Util_1.default.resolveID(id),
            headers: { Authorization: this.token },
            data: data,
        }, {
            requiresToken: true,
        });
    };
    return DiscordAppsDev;
}(ServiceBase_1.default));
exports.default = DiscordAppsDev;
