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
 * Represents the DisTop service.
 * @see https://docs.distop.xyz/
 */
var DisTop = /** @class */ (function (_super) {
    __extends(DisTop, _super);
    function DisTop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DisTop, "aliases", {
        /** The values that can be used to select the service. */
        get: function () {
            return ['distop', 'distop.xyz'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DisTop, "logoURL", {
        /** The logo URL. */
        get: function () {
            return 'https://gblobscdn.gitbook.com/spaces%2F-MNddxbtCjE7i-9BWYMZ%2Favatar-1607019591745.png';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DisTop, "serviceName", {
        /** Service's name. */
        get: function () {
            return 'DisTop';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DisTop, "websiteURL", {
        /** The website URL. */
        get: function () {
            return 'https://bots.distop.xyz/';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DisTop, "baseURL", {
        /** The base URL of the service's API. */
        get: function () {
            return 'https://distop.xyz/api/';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * <warn>Shard data posting is not supported for this service.</warn>
     * @param options The options of the request
     */
    DisTop.post = function (options) {
        var token = options.token, clientID = options.clientID, serverCount = options.serverCount;
        return _super._post.call(this, {
            method: 'post',
            url: "/update/" + Util_1.Util.resolveID(clientID) + "/",
            data: {
                guild_count: Util_1.Util.resolveCount(serverCount),
                token: token
            }
        });
    };
    return DisTop;
}(Service_1.Service));
exports.default = DisTop;
