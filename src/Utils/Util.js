const { Error: DBotsError, RangeError, TypeError } = require('./DBotsError');

/**
 * Contains various general-purpose utility methods.
 */
class Util {
  constructor() {
    throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
  }

  /**
   * Data that can be resolved to give a Discord ID, this can be:
   * * A string
   * * A number
   * * Any value with an `id` key
   * @typedef {string|number|Record<"id", string>} IDResolvable
   */

  /**
   * Resolves data into a Discord ID.
   * @param {IDResolvable} data The data to resolve
   */
  static resolveID(data) {
    if (typeof data === 'undefined' || data === null) 
      throw new DBotsError('INVALID_ID');

    let id = null;
    if (typeof data === 'string')
      id = data;
    else if (typeof data === 'number')
      id = String(data);
    else if (typeof data === 'object' &&
      Object.prototype.hasOwnProperty.call(data, 'id') &&
      typeof data.id !== 'object')
      return this.resolveID(data.id);
    else throw new DBotsError('INVALID_ID');

    if (/^\d{17,19}$/.test(id))
      return id;
    else throw new DBotsError('INVALID_ID');
  }

  /**
   * Data that can be resolved to give a finite and positive integer.
   * This can include any value that can be parsed into an integer.
   * @typedef {*} CountResolvable
   */

  /**
   * Resolves data into a countable number that is finite and positive.
   * @param {CountResolvable} data The data to resolve
   */
  static resolveCount(data) {
    const count = parseInt(data);
    if (isNaN(count))
      throw new TypeError('INVALID_COUNT');
    else if (count < 0)
      throw new RangeError('COUNT_NEGATIVE');
    return count;
  }
}

module.exports = Util;
