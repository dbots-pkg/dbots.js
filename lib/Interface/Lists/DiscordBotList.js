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
 * Represents the Discord Bot List service.
 * @see https://discordbotlist.com/api-docs
 */
var DiscordBotList = /** @class */ (function (_super) {
    __extends(DiscordBotList, _super);
    function DiscordBotList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DiscordBotList, "aliases", {
        /** The values that can be used to select the service. */
        get: function () {
            return ['discordbotlist', 'discordbotlist.com'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordBotList, "logoURL", {
        /** The logo URL. */
        get: function () {
            return 'https://discordbotlist.com/android-icon-192x192.png';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordBotList, "serviceName", {
        /** Service's name. */
        get: function () {
            return 'Discord Bot List';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordBotList, "websiteURL", {
        /** The website URL. */
        get: function () {
            return 'https://discordbotlist.com';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiscordBotList, "baseURL", {
        /** The base URL of the service's API. */
        get: function () {
            return 'https://discordbotlist.com/api/v1';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Posts statistics to this service.
     * @param options The options of the request
     */
    DiscordBotList.post = function (options) {
        var token = options.token, clientID = options.clientID, serverCount = options.serverCount, shard = options.shard, userCount = options.userCount, voiceConnections = options.voiceConnections;
        var data = { guilds: Util_1.Util.resolveCount(serverCount) };
        if (shard)
            data.shard_id = shard.id;
        if (userCount)
            data.users = Util_1.Util.resolveCount(userCount);
        if (voiceConnections)
            data.voice_connections = Util_1.Util.resolveCount(voiceConnections);
        return _super._post.call(this, {
            method: 'post',
            url: "/bots/" + Util_1.Util.resolveID(clientID) + "/stats",
            headers: { Authorization: "Bot " + token },
            data: data
        });
    };
    return DiscordBotList;
}(Service_1.Service));
exports.default = DiscordBotList;
