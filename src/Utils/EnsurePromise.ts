import { eventHandler } from './Constants'

/** A generic string callback */
export type stringCallback = (...args: any[]) => string

/** Data that can be resolved to give a string. This can either be a Function or a Promise. */
export type PromiseResolvable<T> = stringCallback | eventHandler | Promise<T>

export function EnsurePromise<T>(
  func: ((...args: any[]) => T) | Promise<T>,
  ...args: any[]
): Promise<T> | undefined {
  if (typeof func === 'function')
    return new Promise((resolve) => resolve(func(...args)))
  else if (func instanceof Promise) return func
}
