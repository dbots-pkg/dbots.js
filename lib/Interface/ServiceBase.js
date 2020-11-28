"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var FormatRequest_1 = __importDefault(require("../Utils/FormatRequest"));
var DBotsError_1 = require("../Utils/DBotsError");
var Error = DBotsError_1.errors.Error;
// @ts-expect-error
var buildURL_1 = __importDefault(require("axios/lib/helpers/buildURL"));
var Util_1 = require("../Utils/Util");
/** Represents a basic service. */
var ServiceBase = /** @class */ (function () {
    /**
     * @param token The token/key for the service
     */
    function ServiceBase(token) {
        this.token = token;
    }
    Object.defineProperty(ServiceBase, "baseURL", {
        /** The base URL of the service's API. */
        get: function () {
            return '';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Gets a service from a key.
     * @param key The name of the service to get
     * @param extras An array of {@link CustomService}s to include
     */
    ServiceBase.get = function (key, extras) {
        if (extras === void 0) { extras = []; }
        if (!key || typeof key !== 'string')
            return null;
        var services = __spreadArrays(Object.values(serviceClasses), extras);
        for (var i = 0, len = services.length; i < len; i++) {
            var service = services[i];
            if (!service || !service.aliases || !service.post)
                continue;
            if (service.aliases.includes(key.toLowerCase()))
                return service;
        }
        return null;
    };
    /** Gets every loaded service. */
    ServiceBase.getAll = function () {
        return serviceClasses;
    };
    /**
     * Posts statistics to this service.
     * Internally, this is supposed to be used in extended classes.
     * @param form The request form
     * @param appendBaseURL Whether to append the service's base API url
     * @private
     */
    ServiceBase._post = function (form, appendBaseURL) {
        if (appendBaseURL === void 0) { appendBaseURL = true; }
        if (this.serviceName === 'ServiceBase')
            return Promise.reject(new Error('CALLED_FROM_BASE'));
        if (this.baseURL && appendBaseURL)
            form.url = this.baseURL + form.url;
        return FormatRequest_1.default(form);
    };
    /**
     * Sends a request for the service interface.
     * @param form The request form
     * @param options The options of this request
     * @private
     */
    ServiceBase.prototype._request = function (form, options) {
        if (options === void 0) { options = {}; }
        var _a = options.requiresToken, requiresToken = _a === void 0 ? false : _a, _b = options.appendBaseURL, appendBaseURL = _b === void 0 ? true : _b;
        if (requiresToken && !this.token)
            return Promise.reject(new Error('REQUIRES_TOKEN'));
        Util_1.assert(this.constructor);
        if (this.constructor.baseURL && appendBaseURL)
            form.url = this.constructor.baseURL + form.url;
        return FormatRequest_1.default(form);
    };
    /**
     * Appends query string to a URL.
     * @param url The URL to modify
     * @param query The query to append
     * @param appendBaseURL Whether to prepend the service's base API url
     * @returns The modified URL
     * @private
     */
    ServiceBase.prototype._appendQuery = function (url, query, appendBaseURL) {
        if (appendBaseURL === void 0) { appendBaseURL = true; }
        Util_1.assert(this.constructor);
        if (this.constructor.baseURL && appendBaseURL)
            url = this.constructor.baseURL + url;
        return buildURL_1.default(url, query);
    };
    Object.defineProperty(ServiceBase, "aliases", {
        /** The values that can be used to select the service. */
        get: function () {
            throw 'This is just a placeholder prop, it should not be accessed';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServiceBase, "logoURL", {
        /**
         * The logo URL, used only for documentation.
         * @private
         */
        get: function () {
            throw 'This is just a placeholder prop, it should not be accessed';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServiceBase, "serviceName", {
        /**
         * Service's name, used only for documentation.
         * @private
         */
        get: function () {
            throw 'This is just a placeholder prop, it should not be accessed';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServiceBase, "websiteURL", {
        /**
         * The website URL, used only for documentation.
         * @private
         */
        get: function () {
            throw 'This is just a placeholder prop, it should not be accessed';
        },
        enumerable: false,
        configurable: true
    });
    ServiceBase.post = function (options // eslint-disable-line @typescript-eslint/no-unused-vars
    ) {
        throw 'This is just a placeholder method, it should not be called';
    };
    return ServiceBase;
}());
exports.default = ServiceBase;
// Service loading
var serviceClasses = {};
var usingNode = typeof process != 'undefined' && process.release.name == 'node';
if (!usingNode) {
    serviceClasses = require('../../.tmp/services-list');
}
else {
    var path_1 = eval('require')('path');
    var fs = eval('require')('fs');
    var listsDir_1 = path_1.join(__dirname, './Lists');
    fs.readdirSync(listsDir_1).forEach(function (fileName) {
        if (fileName.endsWith('.d.ts'))
            return;
        var listClass = require(path_1.join(listsDir_1, fileName)).default;
        if (listClass)
            serviceClasses[path_1.parse(fileName).name] = listClass;
    });
}
