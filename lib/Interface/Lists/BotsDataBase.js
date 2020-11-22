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
 * Represents the BotsDataBase service.
 * @see https://docs.botsdatabase.com/
 */
var BotsDataBase = /** @class */ (function (_super) {
    __extends(BotsDataBase, _super);
    function BotsDataBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BotsDataBase, "aliases", {
        get: function () {
            return ['botsdatabase', 'bdb'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BotsDataBase, "logoURL", {
        get: function () {
            return 'https://botsdatabase.com/images/icons/favicon-96x96.png';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BotsDataBase, "serviceName", {
        get: function () {
            return 'BotsDataBase';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BotsDataBase, "websiteURL", {
        get: function () {
            return 'https://botsdatabase.com';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BotsDataBase, "baseURL", {
        get: function () {
            return 'https://api.botsdatabase.com/v1';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * <warn>Shard data posting is not supported for this service.</warn>
     * @param options The options of the request
     */
    BotsDataBase.post = function (options) {
        var token = options.token, clientID = options.clientID, serverCount = options.serverCount;
        return _super._post.call(this, {
            method: 'post',
            url: "/bots/" + Util_1.default.resolveID(clientID),
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            data: { servers: Util_1.default.resolveCount(serverCount) },
        });
    };
    /**
     * Gets the user listed on this service.
     * @param id The user's ID
     */
    BotsDataBase.prototype.getUser = function (id) {
        return this._request({ url: "/users/" + Util_1.default.resolveID(id) });
    };
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    BotsDataBase.prototype.getBot = function (id) {
        return this._request({ url: "/bots/" + Util_1.default.resolveID(id) });
    };
    /**
     * Gets the list of people who voted this bot on this service.
     * @param id The bot's ID
     */
    BotsDataBase.prototype.getBotVotes = function (id) {
        return this._request({
            url: "/bots/" + Util_1.default.resolveID(id) + "/votes",
            headers: { Authorization: this.token },
        }, { requiresToken: true });
    };
    return BotsDataBase;
}(ServiceBase_1.default));
exports.default = BotsDataBase;
