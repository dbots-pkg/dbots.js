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
 * Represents the Arcane Bot Center service.
 * @see https://arcane-center.xyz/documentation
 */
var Arcane = /** @class */ (function (_super) {
    __extends(Arcane, _super);
    function Arcane() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Arcane, "aliases", {
        get: function () {
            return [
                'arcanebotcenter',
                'arcane-botcenter.xyz',
                'arcanebotcenter.xyz',
                'arcane',
                'abc',
                'arcane-center.xyz',
                'arcanecenter.xyz',
            ];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Arcane, "logoURL", {
        get: function () {
            return 'https://i.olsh.me/icon?size=1..100..500&url=arcane-botcenter.xyz';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Arcane, "serviceName", {
        get: function () {
            return 'Arcane Bot List';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Arcane, "websiteURL", {
        get: function () {
            return 'https://arcane-center.xyz';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Arcane, "baseURL", {
        get: function () {
            return 'https://arcane-center.xyz/api';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * @param options The options of the request
     */
    Arcane.post = function (options) {
        var token = options.token, clientID = options.clientID, serverCount = options.serverCount, userCount = options.userCount, shard = options.shard;
        return _super._post.call(this, {
            method: 'post',
            url: "/" + Util_1.default.resolveID(clientID) + "/stats",
            headers: { Authorization: token },
            data: shard
                ? {
                    server_count: Util_1.default.resolveCount(serverCount),
                    member_count: Util_1.default.resolveCount(userCount),
                    shard_count: shard.count,
                }
                : {
                    server_count: Util_1.default.resolveCount(serverCount),
                    member_count: Util_1.default.resolveCount(userCount),
                },
        });
    };
    return Arcane;
}(ServiceBase_1.default));
exports.default = Arcane;
