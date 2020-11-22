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
var ClientFiller_1 = __importDefault(require("../ClientFiller"));
/**
 * Represents the client filler for Eris clients.
 * @private
 */
var Eris = /** @class */ (function (_super) {
    __extends(Eris, _super);
    function Eris() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Eris.prototype, "userCount", {
        get: function () {
            var _a;
            return (_a = this.client.users) === null || _a === void 0 ? void 0 : _a.size;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Eris.prototype, "serverCount", {
        get: function () {
            var _a;
            return (_a = this.client.guilds) === null || _a === void 0 ? void 0 : _a.size;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Eris.prototype, "voiceConnections", {
        get: function () {
            var _a, _b, _c, _d;
            if (((_b = (_a = this.client.voiceConnections) === null || _a === void 0 ? void 0 : _a.constructor) === null || _b === void 0 ? void 0 : _b.name) ===
                'VoiceConnectionManager')
                return (_c = this.client.voiceConnections) === null || _c === void 0 ? void 0 : _c.size;
            else
                return Object.keys((_d = this.client.voiceConnections) === null || _d === void 0 ? void 0 : _d.pendingGuilds).length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Eris.prototype, "clientID", {
        get: function () {
            var _a;
            return (_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Eris.prototype, "shard", {
        /**
         * <warn>This client does not natively support sharding.</warn>
         * @private
         */
        get: function () {
            return undefined;
        },
        enumerable: false,
        configurable: true
    });
    return Eris;
}(ClientFiller_1.default));
exports.default = Eris;
