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
 * Represents the Space Bots List service.
 * @see https://spacebots.gitbook.io/tutorial-en/
 */
var SpaceBotsList = /** @class */ (function (_super) {
    __extends(SpaceBotsList, _super);
    function SpaceBotsList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SpaceBotsList, "aliases", {
        /** The values that can be used to select the service. */
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
        /** The logo URL. */
        get: function () {
            return 'https://get.snaz.in/334CtqK.jpg';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpaceBotsList, "serviceName", {
        /** Service's name. */
        get: function () {
            return 'Space Bots List';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpaceBotsList, "websiteURL", {
        /** The website URL. */
        get: function () {
            return 'https://space-bot-list.xyz/';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpaceBotsList, "baseURL", {
        /** The base URL of the service's API. */
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
            url: "/bots/" + Util_1.Util.resolveID(clientID),
            headers: { Authorization: token },
            data: {
                guilds: Util_1.Util.resolveCount(serverCount),
                users: Util_1.Util.resolveCount(userCount)
            }
        });
    };
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    SpaceBotsList.prototype.getBot = function (id) {
        return this._request({ url: "/bots/" + Util_1.Util.resolveID(id) });
    };
    return SpaceBotsList;
}(Service_1.Service));
exports.default = SpaceBotsList;
