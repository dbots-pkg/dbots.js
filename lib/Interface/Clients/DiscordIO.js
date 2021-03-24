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
 * Represents the client filler for discord.io clients.
 * @private
 */
var DiscordIO = /** @class */ (function (_super) {
    __extends(DiscordIO, _super);
    function DiscordIO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DiscordIO.prototype, "userCount", {
        get: function () {
            if (!this.client.users)
                return undefined;
            return Object.keys(this.client.users).length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordIO.prototype, "serverCount", {
        get: function () {
            if (!this.client.servers)
                return undefined;
            return Object.keys(this.client.servers).length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordIO.prototype, "voiceConnections", {
        get: function () {
            if (!this.client._vChannels)
                return undefined;
            return Object.keys(this.client._vChannels).length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordIO.prototype, "clientID", {
        get: function () {
            return this.client.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordIO.prototype, "shard", {
        get: function () {
            return this.client._shard
                ? {
                    id: this.client._shard[0],
                    count: this.client._shard[1]
                }
                : undefined;
        },
        enumerable: false,
        configurable: true
    });
    return DiscordIO;
}(ClientFiller_1.ClientFiller));
exports.default = DiscordIO;
