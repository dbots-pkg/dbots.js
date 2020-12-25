"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DBotsError_1 = require("./DBotsError");
var DBotsError = DBotsError_1.errors.Error, RangeError = DBotsError_1.errors.RangeError, TypeError = DBotsError_1.errors.TypeError;
/**
 * Contains various general-purpose utility methods.
 */
var Util = /** @class */ (function () {
    function Util() {
        throw new Error("The " + this.constructor.name + " class may not be instantiated.");
    }
    /**
     * Resolves data into a Discord ID.
     * @param data The data to resolve
     */
    Util.resolveID = function (data) {
        if (typeof data === 'undefined' || data === null)
            throw new DBotsError('INVALID_ID');
        var id = null;
        if (typeof data === 'string')
            id = data;
        else if (typeof data === 'number')
            id = String(data);
        else if (typeof data === 'object' &&
            Object.prototype.hasOwnProperty.call(data, 'id') &&
            typeof data.id !== 'object')
            return Util.resolveID(data.id);
        else
            throw new DBotsError('INVALID_ID');
        if (/^\d{17,19}$/.test(id))
            return id;
        else
            throw new DBotsError('INVALID_ID');
    };
    /**
     * Resolves data into a countable number that is finite and positive.
     * @param data The data to resolve
     */
    Util.resolveCount = function (data) {
        var count = parseInt(data);
        if (isNaN(count))
            throw new TypeError('INVALID_COUNT');
        else if (count < 0)
            throw new RangeError('COUNT_NEGATIVE');
        return count;
    };
    return Util;
}());
exports.default = Util;
