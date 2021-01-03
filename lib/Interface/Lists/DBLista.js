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
var DBotsError_1 = require("../../Utils/DBotsError");
var Util_1 = require("../../Utils/Util");
var Error = DBotsError_1.errors.Error;
/**
 * Represents the DBLista service.
 * @see https://docs.dblista.pl/
 */
var DBLista = /** @class */ (function (_super) {
    __extends(DBLista, _super);
    function DBLista() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DBLista, "aliases", {
        /** The values that can be used to select the service. */
        get: function () {
            return ['dblistapl', 'dblista.pl', 'dblista'];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DBLista, "logoURL", {
        /** The logo URL. */
        get: function () {
            return 'https://i.olsh.me/icon?size=1..100..500&url=dblista.pl';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DBLista, "serviceName", {
        /** Service's name. */
        get: function () {
            return 'DBLista';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DBLista, "websiteURL", {
        /** The website URL. */
        get: function () {
            return 'https://dblista.pl';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DBLista, "baseURL", {
        /** The base URL of the service's API. */
        get: function () {
            return 'https://api.dblista.pl/v1';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * <warn>This service does not support posting.
     * This function is defined to properly return an error if improperly used to post.</warn>
     * @private
     */
    DBLista.post = function () {
        return Promise.reject(new Error('POSTING_UNSUPPORTED', this.name));
    };
    /**
     * Adds a bot to the service.
     * @param data The data being posted. This should include the ID of the bot
     */
    DBLista.prototype.addBot = function (data) {
        return this._request({
            method: 'post',
            url: '/bots',
            headers: { Authorization: this.token },
            data: data
        }, {
            requiresToken: true
        });
    };
    /**
     * Updates the bot's listing with the data provided.
     * @param data The data being posted. This should include the ID of the bot
     */
    DBLista.prototype.updateBot = function (data) {
        return this._request({
            method: 'put',
            url: '/bots',
            headers: { Authorization: this.token },
            data: data
        }, {
            requiresToken: true
        });
    };
    /**
     * Gets the bot listed on this service.
     * @param id The bot's ID
     */
    DBLista.prototype.getBot = function (id) {
        return this._request({ url: "/bots/" + Util_1.Util.resolveID(id) });
    };
    /**
     * Gets a list of bots on this service.
     * @param page The page you want to get
     */
    DBLista.prototype.getBots = function (page) {
        if (page === void 0) { page = 0; }
        return this._request({ url: "/bots/list/" + Util_1.Util.resolveCount(page) });
    };
    /** Gets a list of unverified bots on this service. */
    DBLista.prototype.getUnverifiedBots = function () {
        return this._request({ url: '/bots/list/unverified' });
    };
    /** Gets a list of rejected bots on this service. */
    DBLista.prototype.getRejectedBots = function () {
        return this._request({ url: '/bots/list/rejected' });
    };
    /**
     * Adds a rating to a bot on the service.
     * @param id The bot's ID
     * @param data The data being posted
     */
    DBLista.prototype.rateBot = function (id, data) {
        return this._request({
            method: 'post',
            url: "/bots/" + Util_1.Util.resolveID(id) + "/rate",
            headers: { Authorization: this.token },
            data: data
        }, {
            requiresToken: true
        });
    };
    /**
     * Removes a rating from a bot on the service.
     * @param id The bot's ID
     */
    DBLista.prototype.removeRating = function (id) {
        return this._request({
            method: 'delete',
            url: "/bots/" + Util_1.Util.resolveID(id) + "/rate",
            headers: { Authorization: this.token }
        }, {
            requiresToken: true
        });
    };
    /**
     * Removes a bot from the service.
     * @param id The bot's ID
     */
    DBLista.prototype.removeBot = function (id) {
        return this._request({
            method: 'delete',
            url: "/bots/" + Util_1.Util.resolveID(id),
            headers: { Authorization: this.token }
        }, {
            requiresToken: true
        });
    };
    /**
     * Searches for bots on the service.
     * @param query The query to search for
     */
    DBLista.prototype.search = function (query) {
        return this._request({ url: "/bots/search/" + encodeURIComponent(query) });
    };
    return DBLista;
}(Service_1.Service));
exports.default = DBLista;
