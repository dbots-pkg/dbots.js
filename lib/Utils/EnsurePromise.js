"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function EnsurePromise(func) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (typeof func === 'function')
        return new Promise(function (resolve) { return resolve(func.apply(void 0, args)); });
    else if (func instanceof Promise)
        return func;
}
exports.default = EnsurePromise;
