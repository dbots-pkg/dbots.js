"use strict";
// Taken from Discord.JS's way of making errors
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
exports.errors = exports.register = exports.messages = exports.codeSymbol = void 0;
exports.codeSymbol = Symbol('code');
exports.messages = new Map();
// This is just a mock class to make docs work
/**
 * Extend an error of some sort into a DBotsError.
 * @param {string} key Error key
 * @param {any[]} args Arguments to pass for util format or as function args
 * @extends Error
 * @private
 */
var DBotsError = /** @class */ (function (_super) {
    __extends(DBotsError, _super);
    function DBotsError() {
        var _this = _super.call(this) || this;
        _this.name = '';
        _this.code = '';
        return _this;
    }
    return DBotsError;
}(Error));
/**
 * Extend an error of some sort into a DBotsError.
 * @param Base Base error to extend
 * @returns The resulting class (as a class, not an instance)
 */
function makeDbotsError(Base) {
    return /** @class */ (function (_super) {
        __extends(DBotsError, _super);
        function DBotsError(key) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var _this = _super.call(this, message(key, args)) || this;
            // @ts-expect-error
            _this[exports.codeSymbol] = key;
            if (Error.captureStackTrace)
                Error.captureStackTrace(_this, DBotsError);
            return _this;
        }
        Object.defineProperty(DBotsError.prototype, "name", {
            get: function () {
                // @ts-expect-error
                return _super.prototype.name + " [" + this[exports.codeSymbol] + "]";
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DBotsError.prototype, "code", {
            get: function () {
                // @ts-expect-error
                return this[exports.codeSymbol];
            },
            enumerable: false,
            configurable: true
        });
        return DBotsError;
    }(Base));
}
/**
 * Format the message for an error.
 * @param key Error key
 * @param args Arguments to pass for util format or as function args
 * @returns Formatted string
 */
function message(key, args) {
    if (typeof key !== 'string')
        throw new Error('Error message key must be a string');
    var msg = exports.messages.get(key);
    if (!['string', 'function'].includes(typeof msg))
        throw new Error("An invalid error message key was used: " + key + ".");
    if (typeof msg === 'function')
        return msg.apply(void 0, args);
    if (args === undefined || args.length === 0)
        return msg;
    args.unshift(msg);
    return String.apply(void 0, args);
}
/**
 * Register an error code and message.
 * @param sym Unique name for the error
 * @param val Value of the error
 */
function register(sym, val) {
    exports.messages.set(sym, typeof val === 'function' ? val : String(val));
}
exports.register = register;
var messageObject = {
    INVALID_POSTER_OPTIONS: 'An object is required a parameter to construct a poster.',
    NO_CLIENT_OR_ID: 'clientID must be defined when client is non-existant.',
    UNKNOWN_CLIENT: function (count_name) {
        return "Can't retrieve " + count_name + " count from non-existant client.";
    },
    NO_CLIENT: function (count_name) {
        return "Can't retrieve " + count_name + " count from unknown client.";
    },
    NO_API_KEYS: "Can't post with a poster that has no API keys.",
    SERVICE_NO_KEY: function (service) {
        return "Can't post to \"" + service + "\" without an API key.";
    },
    INVALID_SERVICE: function (service) { return "\"" + service + "\" is an invalid service."; },
    HANDLER_INVALID: 'Given handler is not a PromiseResolvable.',
    UNSUPPORTED_EVENT: function (action) {
        return "Can't " + action + " handler for an unsupported event.";
    },
    CALLED_FROM_BASE: 'This function needs to be called by an extended class.',
    REQUIRES_TOKEN: 'This endpoint requires a token.',
    POSTING_UNSUPPORTED: function (service) {
        return "The service " + service + " does not support posting.";
    },
    INVALID_ID: 'An invalid ID was given.',
    INVALID_COUNT: 'An invalid countable number was given.',
    COUNT_NEGATIVE: 'A countable number cannot be negative.',
    GENERIC: function (err) { return err; },
};
for (var _i = 0, _a = Object.entries(messageObject); _i < _a.length; _i++) {
    var _b = _a[_i], name_1 = _b[0], message_1 = _b[1];
    register(name_1, message_1);
}
exports.errors = {
    Error: makeDbotsError(Error),
    TypeError: makeDbotsError(TypeError),
    RangeError: makeDbotsError(RangeError),
};
