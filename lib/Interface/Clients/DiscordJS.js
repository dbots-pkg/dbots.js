"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ClientFiller_1 = require("../ClientFiller");
/**
 * Represents the client filler for discord.js clients.
 * @private
 */
var DiscordJS = /** @class */ (function (_super) {
    __extends(DiscordJS, _super);
    function DiscordJS() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DiscordJS.prototype, "userCount", {
        get: function () {
            var _a, _b, _c, _d, _e;
            if (((_b = (_a = this.client.guilds) === null || _a === void 0 ? void 0 : _a.constructor) === null || _b === void 0 ? void 0 : _b.name) === 'GuildManager')
                return (_d = (_c = this.client.guilds) === null || _c === void 0 ? void 0 : _c.cache) === null || _d === void 0 ? void 0 : _d.reduce(function (count, guild) { return count + guild.memberCount; }, 0);
            else
                return (_e = this.client.guilds) === null || _e === void 0 ? void 0 : _e.reduce(function (count, guild) { return count + guild.memberCount; }, 0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordJS.prototype, "serverCount", {
        get: function () {
            var _a, _b, _c, _d, _e;
            if (((_b = (_a = this.client.guilds) === null || _a === void 0 ? void 0 : _a.constructor) === null || _b === void 0 ? void 0 : _b.name) === 'GuildManager')
                return (_d = (_c = this.client.guilds) === null || _c === void 0 ? void 0 : _c.cache) === null || _d === void 0 ? void 0 : _d.size;
            else
                return (_e = this.client.guilds) === null || _e === void 0 ? void 0 : _e.size;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordJS.prototype, "voiceConnections", {
        get: function () {
            var _a, _b;
            if (this.client.voice)
                return ((_a = this.client.voice.broadcasts) === null || _a === void 0 ? void 0 : _a.length) || 0;
            else
                return (_b = this.client.broadcasts) === null || _b === void 0 ? void 0 : _b.size;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordJS.prototype, "clientID", {
        get: function () {
            var _a;
            return (_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordJS.prototype, "shard", {
        get: function () {
            return this.client.shard
                ? {
                    id: this.client.shard.id,
                    count: this.client.shard.count
                }
                : undefined;
        },
        enumerable: false,
        configurable: true
    });
    return DiscordJS;
}(ClientFiller_1.ClientFiller));
exports.default = DiscordJS;
