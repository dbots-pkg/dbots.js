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
var ClientFiller_1 = require("../ClientFiller");
/**
 * Represents the client filler for discordie clients.
 * @private
 */
var Discordie = /** @class */ (function (_super) {
    __extends(Discordie, _super);
    function Discordie() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Discordie.prototype, "userCount", {
        get: function () {
            var _a;
            return (_a = this.client.Guilds) === null || _a === void 0 ? void 0 : _a.size;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Discordie.prototype, "serverCount", {
        get: function () {
            var _a;
            return (_a = this.client.Users) === null || _a === void 0 ? void 0 : _a.size;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Discordie.prototype, "voiceConnections", {
        get: function () {
            var _a;
            return (_a = this.client.VoiceConnections) === null || _a === void 0 ? void 0 : _a.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Discordie.prototype, "clientID", {
        get: function () {
            var _a;
            return (_a = this.client.User) === null || _a === void 0 ? void 0 : _a.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Discordie.prototype, "shard", {
        get: function () {
            var _a, _b;
            return ((_a = this.client.options) === null || _a === void 0 ? void 0 : _a.shardId) && ((_b = this.client.options) === null || _b === void 0 ? void 0 : _b.shardCount)
                ? {
                    id: this.client.options.shardId,
                    count: this.client.options.shardCount
                }
                : undefined;
        },
        enumerable: false,
        configurable: true
    });
    return Discordie;
}(ClientFiller_1.ClientFiller));
exports.default = Discordie;
