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
 * Represents the Carbonitex service.
 */
var Carbon = /** @class */ (function (_super) {
    __extends(Carbon, _super);
    function Carbon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Carbon, "aliases", {
        /** The values that can be used to select the service. */
        get: function () {
            return ['carbonitex', 'carbonitex.net', 'carbon'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Carbon, "logoURL", {
        /** The logo URL. */
        get: function () {
            return 'https://get.snaz.in/7N8ywwr.png';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Carbon, "serviceName", {
        /** Service's name. */
        get: function () {
            return 'Carbonitex';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Carbon, "websiteURL", {
        /** The website URL. */
        get: function () {
            return 'https://www.carbonitex.net/Discord/bots';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Carbon, "baseURL", {
        /** The base URL of the service's API. */
        get: function () {
            return 'https://www.carbonitex.net/discord';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * <warn>Shard data posting is not supported for this service.</warn>
     * @param options The options of the request
     */
    Carbon.post = function (options) {
        var token = options.token, serverCount = options.serverCount;
        return _super._post.call(this, {
            method: 'post',
            url: '/data/botdata.php',
            data: { key: token, servercount: Util_1.default.resolveCount(serverCount) }
        });
    };
    /** Gets a list of bots on this service. */
    Carbon.prototype.getBots = function () {
        return this._request({ url: '/api/listedbots' });
    };
    return Carbon;
}(ServiceBase_1.default));
exports.default = Carbon;
