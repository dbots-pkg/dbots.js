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
 * Represents the Arcane Bot Center service.
 * @see https://arcane-center.xyz/documentation
 */
var Arcane = /** @class */ (function (_super) {
    __extends(Arcane, _super);
    function Arcane() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Arcane, "aliases", {
        /** The values that can be used to select the service. */
        get: function () {
            return ['arcane', 'arcane-center.xyz'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Arcane, "logoURL", {
        /** The logo URL. */
        get: function () {
            return 'https://i.olsh.me/icon?size=1..100..500&url=arcane-botcenter.xyz';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Arcane, "serviceName", {
        /** Service's name. */
        get: function () {
            return 'Arcane Bot List';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Arcane, "websiteURL", {
        /** The website URL. */
        get: function () {
            return 'https://arcane-center.xyz';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Arcane, "baseURL", {
        /** The base URL of the service's API. */
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
            url: "/" + Util_1.Util.resolveID(clientID) + "/stats",
            headers: { Authorization: token },
            data: shard
                ? {
                    server_count: Util_1.Util.resolveCount(serverCount),
                    member_count: Util_1.Util.resolveCount(userCount),
                    shard_count: shard.count
                }
                : {
                    server_count: Util_1.Util.resolveCount(serverCount),
                    member_count: Util_1.Util.resolveCount(userCount)
                }
        });
    };
    return Arcane;
}(Service_1.Service));
exports.default = Arcane;
