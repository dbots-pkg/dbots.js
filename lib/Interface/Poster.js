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
var Constants_1 = require("../Utils/Constants");
var EnsurePromise_1 = __importDefault(require("../Utils/EnsurePromise"));
var DBotsError_1 = require("../Utils/DBotsError");
var ClientFiller_1 = __importDefault(require("./ClientFiller"));
var ServiceBase_1 = __importDefault(require("./ServiceBase"));
var promise_allsettled_1 = __importDefault(require("promise.allsettled"));
var DBotsError = DBotsError_1.errors.Error, TypeError = DBotsError_1.errors.TypeError;
/** A class that posts server count to listing site(s). */
var Poster = /** @class */ (function () {
    // #endregion
    /**
     * @constructor
     * @param options The options needed to construct the poster
     */
    function Poster(options) {
        var _a, _b;
        if (!options || typeof options !== 'object')
            throw new DBotsError('INVALID_POSTER_OPTIONS');
        this.client = options.client;
        this._clientFiller = null;
        this.customServices = options.customServices || [];
        this.apiKeys = options.apiKeys || {};
        this.options = options;
        if (typeof options.useSharding !== 'boolean')
            options.useSharding = true;
        if (!this.client && !options.clientID)
            throw new DBotsError('NO_CLIENT_OR_ID');
        if (this.client && !options.clientID)
            Object.assign(options, {
                clientID: (_a = this.clientFiller) === null || _a === void 0 ? void 0 : _a.clientID,
                shard: (_b = this.clientFiller) === null || _b === void 0 ? void 0 : _b.shard,
            });
        if (!options.useSharding)
            options.shard = undefined;
        this.handlers = {};
        for (var _i = 0, SupportedEvents_1 = Constants_1.SupportedEvents; _i < SupportedEvents_1.length; _i++) {
            var event_1 = SupportedEvents_1[_i];
            this.handlers[event_1] = [];
        }
    }
    Object.defineProperty(Poster.prototype, "clientFiller", {
        /** The client filler used in the poster */
        get: function () {
            return this._clientFiller ||
                ((this.options.clientLibrary && this.client)
                    ? this._clientFiller = ClientFiller_1.default.get(this.options.clientLibrary, this.client)
                    : undefined);
        },
        enumerable: false,
        configurable: true
    });
    /**
      * Retrieves the current server count of the client/shard.
      * @returns Amount of servers the client/shard is in
      */
    Poster.prototype.getServerCount = function () {
        var _a;
        if (this.options.serverCount)
            // @ts-expect-error
            return EnsurePromise_1.default(this.options.serverCount);
        if (!this.client)
            throw new DBotsError('NO_CLIENT', 'server');
        if (!this.options.serverCount && !this.options.clientLibrary)
            throw new DBotsError('UNKNOWN_CLIENT', 'server');
        return Promise.resolve(((_a = this.clientFiller) === null || _a === void 0 ? void 0 : _a.serverCount) || 0);
    };
    /**
      * Retrieves the current user count of the client/shard.
      * @returns Amount of users the client/shard is connected with
     */
    Poster.prototype.getUserCount = function () {
        var _a;
        if (this.options.userCount)
            // @ts-expect-error
            return EnsurePromise_1.default(this.options.userCount);
        if (!this.client)
            throw new DBotsError('NO_CLIENT', 'user');
        if (!this.options.userCount && !this.options.clientLibrary)
            throw new DBotsError('UNKNOWN_CLIENT', 'user');
        return Promise.resolve(((_a = this.clientFiller) === null || _a === void 0 ? void 0 : _a.userCount) || 0);
    };
    /**
     * Retrieves the current voice connection count of the client/shard.
     * @returns Number of active voice connections
     */
    Poster.prototype.getVoiceConnections = function () {
        var _a;
        if (this.options.voiceConnections)
            // @ts-expect-error
            return EnsurePromise_1.default(this.options.voiceConnections);
        if (!this.client)
            throw new DBotsError('NO_CLIENT', 'voice connection');
        if (!this.options.voiceConnections && !this.options.clientLibrary)
            throw new DBotsError('UNKNOWN_CLIENT', 'voice connection');
        return Promise.resolve(((_a = this.clientFiller) === null || _a === void 0 ? void 0 : _a.voiceConnections) || 0);
    };
    /**
      * Creates an interval that posts to all services.
      * @param interval The time (in ms) to reach to post to all {@link Service}s again
      * @returns The interval that is responsible for posting
      */
    Poster.prototype.startInterval = function (interval) {
        var _this_1 = this;
        if (interval === void 0) { interval = 1800000; }
        this._interval && clearTimeout(this._interval);
        this._interval = setInterval(function () { return _this_1.post().then(function (result) {
            _this_1.runHandlers('autopost', result);
            return result;
        }).catch(function (error) { return _this_1.runHandlers('autopostfail', error); }); }, interval);
        return this._interval;
    };
    /** Destroys the current interval. */
    Poster.prototype.stopInterval = function () {
        if (this._interval)
            clearTimeout(this._interval);
    };
    /**
      * Gets a service, autofilling its API key if the poster has it.
      * @param service The service to get
      */
    Poster.prototype.getService = function (service) {
        var _this_1 = this;
        var serviceClass = ServiceBase_1.default.get(service, this.customServices);
        if (!serviceClass)
            return null;
        if (!Object.prototype.isPrototypeOf.call(ServiceBase_1.default, serviceClass))
            return serviceClass;
        var keyName = serviceClass.aliases.find(function (key) { return Object.keys(_this_1.apiKeys).includes(key); });
        if (keyName)
            return new serviceClass(this.apiKeys[keyName]);
    };
    /**
      * Posts the current clients server count to a service.
      * @param service The service to post to
      * @see Poster#postManual
      * @returns The result(s) of the post
      */
    Poster.prototype.post = function (service) {
        if (service === void 0) { service = 'all'; }
        var _this = this;
        return new Promise(function (resolve, reject) {
            return Promise.all([_this.getServerCount(), _this.getUserCount(), _this.getVoiceConnections()])
                .then(function (_a) {
                var serverCount = _a[0], userCount = _a[1], voiceConnections = _a[2];
                _this.postManual(service, { serverCount: serverCount, userCount: userCount, voiceConnections: voiceConnections })
                    .then(resolve).catch(reject);
            }).catch(reject);
        });
    };
    /**
      * Manually posts a server count to a service.
      * @param service The service to post to
      * @param counts An object containing the tallies of servers, users and voice connections
      * @returns The result(s) of the post
      */
    Poster.prototype.postManual = function (service, counts) {
        var _this_1 = this;
        var serverCount = counts.serverCount, userCount = counts.userCount, voiceConnections = counts.voiceConnections;
        if (!service)
            service = 'all';
        if (!this.apiKeys && !this.options.post)
            return Promise.reject(new DBotsError('NO_API_KEYS'));
        if (service === 'custom')
            // @ts-expect-error
            return EnsurePromise_1.default(this.options.post, this.options.clientID, serverCount, this.options.shard);
        if (!service || service === 'all') {
            var services = Object.keys(this.apiKeys);
            if (this.options.post)
                services.push('custom');
            return promise_allsettled_1.default(services.map(function (k) { return _this_1.postManual(k, { serverCount: serverCount, userCount: userCount, voiceConnections: voiceConnections }); }))
                .then(function (requests) {
                var _a, _b;
                var rejected = [], hostnames = [];
                for (var _i = 0, requests_1 = requests; _i < requests_1.length; _i++) {
                    var r = requests_1[_i];
                    if (r.status == 'rejected') {
                        rejected.push(r);
                        // @ts-expect-error
                        if ((_b = (_a = r === null || r === void 0 ? void 0 : r.reason) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b.url) {
                            // @ts-expect-error
                            var hostname = new URL(r.reason.config.url).hostname;
                            if (hostname && !hostnames.includes(hostname))
                                hostnames.push(hostname);
                        }
                        else
                            hostnames.push('???');
                    }
                }
                if (rejected.length > 0) {
                    var msg = rejected.length + " request" + (rejected.length == 1 ? '' : 's') + " have been rejected.\n";
                    if (hostnames.length > 0)
                        msg += "Failing hostnames: " + hostnames.join(', ') + "\n";
                    msg += 'Please check the error from the following responses.\n';
                    msg += rejected.map(function (rej) {
                        var reason = rej.reason || rej;
                        return (reason && typeof reason == 'object' && !(reason instanceof Error)) ?
                            JSON.stringify(reason, null, 2) :
                            reason.toString();
                    }).join('\n');
                    throw new DBotsError('GENERIC', msg);
                }
                else {
                    // @ts-expect-error
                    return requests.map(function (r) { return r.value; });
                }
            });
        }
        if (!Object.keys(this.apiKeys).includes(service))
            return Promise.reject(new DBotsError('SERVICE_WITH_NO_KEY', service));
        var serviceClass = ServiceBase_1.default.get(service, this.customServices);
        if (!serviceClass)
            return Promise.reject(new TypeError('INVALID_SERVICE', service));
        return new Promise(function (resolve, reject) {
            serviceClass.post({
                token: _this_1.apiKeys[service],
                clientID: _this_1.options.clientID || '',
                shard: _this_1.options.shard,
                serverCount: serverCount,
                userCount: userCount,
                voiceConnections: voiceConnections
            }).then(function (result) {
                _this_1.runHandlers('post', result);
                resolve(result);
            }).catch(function (error) {
                _this_1.runHandlers('postfail', error);
                reject(error);
            });
        });
    };
    /**
     * Adds an handler for an event.
     * @param event The name of the event to add the handler to
     * @param handler The function that is run with the event
     * @returns The array of handlers currently set for that event
     */
    Poster.prototype.addHandler = function (event, handler) {
        if (!Constants_1.SupportedEvents.includes(event))
            throw new TypeError('UNSUPPORTED_EVENT', 'add');
        if (!(handler instanceof Function))
            throw new DBotsError('HANDLER_INVALID');
        this.handlers[event].push(handler);
        return this.handlers[event];
    };
    /**
     * Removes an handler for an event.
     * @param event The name of the event to remove the handler from
     * @param handler The function that is run with the event
     * @returns The array of handlers currently set for that event
     */
    Poster.prototype.removeHandler = function (event, handler) {
        if (!Constants_1.SupportedEvents.includes(event))
            throw new TypeError('UNSUPPORTED_EVENT', 'remove');
        if (!(handler instanceof Function))
            throw new DBotsError('HANDLER_INVALID');
        var index = this.handlers[event].indexOf(handler);
        if (index >= 0)
            this.handlers[event].splice(index, 1);
        return this.handlers[event];
    };
    /**
     * Manually triggers an event with custom arguments.
     * @param {CustomEvent} event The name of the event to run the handlers for
     * @param  {...any} args The arguments to pass to the handlers
     */
    Poster.prototype.runHandlers = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!Constants_1.SupportedEvents.includes(event))
            throw new TypeError('UNSUPPORTED_EVENT', 'run');
        for (var _a = 0, _b = this.handlers[event]; _a < _b.length; _a++) {
            var handler = _b[_a];
            EnsurePromise_1.default.apply(void 0, __spreadArrays([handler], args));
        }
    };
    return Poster;
}());
exports.default = Poster;
