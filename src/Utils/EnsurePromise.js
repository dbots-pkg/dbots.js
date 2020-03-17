/**
 * @callback stringCallback
 * @returns {string}
 */

/**
 * Data that can be resolved to give a string. This can either be a Function or a Promise.
 * @typedef {stringCallback|eventHandler|Promise<string>} PromiseResolvable
 */

module.exports = function EnsurePromise(func, ...args) {
  if (typeof func === 'function')
    return new Promise(resolve => resolve(func(...args)));
  else if (func instanceof Promise) return func;
};
