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
 * Represents the Space Bots List service.
 * @see https://spacebots.gitbook.io/tutorial-en/
 */
var SpaceBotsList = /** @class */ (function (_super) {
    __extends(SpaceBotsList, _super);
    function SpaceBotsList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SpaceBotsList, "aliases", {
        get: function () {
            return [
                'spacebotslist',
                'spacebotlist',
                'spacebots',
                'space-bot-list.org',
                'space',
                'sbl'
            ];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpaceBotsList, "logoURL", {
        get: function () {
            return 'https://get.snaz.in/334CtqK.jpg';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpaceBotsList, "serviceName", {
        get: function () {
            return 'Space Bots List';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpaceBotsList, "websiteURL", {
        get: function () {
            return 'https://space-bot-list.xyz/';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpaceBotsList, "baseURL", {
        get: function () {
            return 'https://space-bot-list.xyz/api';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * <warn>Shard data posting is not supported for this service.</warn>
     * @param options The options of the request
     */
    SpaceBotsList.post = function (options) {
        var token = options.token, clientID = options.clientID, serverCount = options.serverCount, userCount = options.userCount;
        return _super._post.call(this, {
            method: 'post',
            url: "/bots/" + Util_1.default.resolveID(clientID),
            headers: { Authorization: token },
            data: {
                guilds: Util_1.default.resolveCount(serverCount),
                users: Util_1.default.resolveCount(userCount)
            }
        });
    };
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    SpaceBotsList.prototype.getBot = function (id) {
        return this._request({ url: "/bots/" + Util_1.default.resolveID(id) });
    };
    return SpaceBotsList;
}(ServiceBase_1.default));
exports.default = SpaceBotsList;
