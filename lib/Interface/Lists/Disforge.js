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
var Service_1 = require("../Service");
var Util_1 = require("../../Utils/Util");
/**
 * Represents the Disforge service.
 * @see https://disforge.com/developer
 */
var Disforge = /** @class */ (function (_super) {
    __extends(Disforge, _super);
    function Disforge() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Disforge, "aliases", {
        /** The values that can be used to select the service. */
        get: function () {
            return ['disforge', 'disforge.com'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Disforge, "logoURL", {
        /** The logo URL. */
        get: function () {
            return 'https://disforge.com/assets/img/ui/categories/all-bots.png';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Disforge, "serviceName", {
        /** Service's name. */
        get: function () {
            return 'Disforge';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Disforge, "websiteURL", {
        /** The website URL. */
        get: function () {
            return 'https://disforge.com/bots';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Disforge, "baseURL", {
        /** The base URL of the service's API. */
        get: function () {
            return 'https://disforge.com/api';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * <warn>Shard data posting is not supported for this service.</warn>
     * @param options The options of the request
     */
    Disforge.post = function (options) {
        var token = options.token, clientID = options.clientID, serverCount = options.serverCount;
        return _super._post.call(this, {
            method: 'post',
            url: "/botstats/" + Util_1.Util.resolveID(clientID),
            headers: {
                Authorization: token
            },
            data: {
                servers: Util_1.Util.resolveCount(serverCount)
            }
        });
    };
    /**
     * Retreives the data shown on the homepage.
     */
    Disforge.prototype.getHomepage = function () {
        return this._request({ url: "/home" });
    };
    /**
     * Retreives statistics about Disforge.
     */
    Disforge.prototype.getStats = function () {
        return this._request({ url: "/stats" });
    };
    return Disforge;
}(Service_1.Service));
exports.default = Disforge;
