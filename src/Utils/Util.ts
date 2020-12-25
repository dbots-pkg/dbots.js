import { errors } from './DBotsError'
const { Error: DBotsError, RangeError, TypeError } = errors

/**
 * Data that can be resolved to give a Discord ID, this can be:
 * * A string
 * * A number
 * * Any value with an `id` key
 */
export type IDResolvable = string | number | Record<'id', string>

/**
 * Data that can be resolved to give a finite and positive integer.
 * This can include any value that can be parsed into an integer.
 */
export type CountResolvable = any

/** Just a utility type representing an object */
export type AnyObject = Record<string, any>

/**
 * Enforces a type on its argument
 * @private
 */
export declare function assert<T>(value: any): asserts value is T

/**
 * Contains various general-purpose utility methods.
 */
export default class Util {
  constructor() {
    throw new Error(
      `The ${this.constructor.name} class may not be instantiated.`
    )
  }

  /**
   * Resolves data into a Discord ID.
   * @param data The data to resolve
   */
  static resolveID(data: IDResolvable): string {
    if (typeof data === 'undefined' || data === null)
      throw new DBotsError('INVALID_ID')

    let id = null
    if (typeof data === 'string') id = data
    else if (typeof data === 'number') id = String(data)
    else if (
      typeof data === 'object' &&
      Object.prototype.hasOwnProperty.call(data, 'id') &&
      typeof data.id !== 'object'
    )
      return Util.resolveID(data.id)
    else throw new DBotsError('INVALID_ID')

    if (/^\d{17,19}$/.test(id)) return id
    else throw new DBotsError('INVALID_ID')
  }

  /**
   * Resolves data into a countable number that is finite and positive.
   * @param data The data to resolve
   */
  static resolveCount(data: CountResolvable) {
    const count = parseInt(data)
    if (isNaN(count)) throw new TypeError('INVALID_COUNT')
    else if (count < 0) throw new RangeError('COUNT_NEGATIVE')
    return count
  }
}
