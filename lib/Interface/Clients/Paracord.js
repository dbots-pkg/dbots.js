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
 * Represents the client filler for Paracord clients.
 * @private
 */
var Paracord = /** @class */ (function (_super) {
    __extends(Paracord, _super);
    function Paracord() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Paracord.prototype, "userCount", {
        get: function () {
            return Array.from(this.client.guilds.values).reduce(function (count, guild) { return count + guild.member_count; }, 0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Paracord.prototype, "serverCount", {
        get: function () {
            var _a;
            return (_a = this.client.guilds) === null || _a === void 0 ? void 0 : _a.size;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Paracord.prototype, "voiceConnections", {
        /**
         * <warn>This client does not yet support voice connections.</warn>
         * @private
         */
        get: function () {
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Paracord.prototype, "clientID", {
        get: function () {
            var _a;
            return (_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Paracord.prototype, "shard", {
        /**
         * <warn>This client handles sharding in a way that is not supported by dbots in its current structure.</warn>
         * @private
         */
        get: function () {
            return undefined;
        },
        enumerable: false,
        configurable: true
    });
    return Paracord;
}(ClientFiller_1.ClientFiller));
exports.default = Paracord;
