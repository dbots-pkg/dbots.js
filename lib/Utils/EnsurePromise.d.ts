import { eventHandler } from './Constants';
/** A generic string callback */
export declare type stringCallback = (...args: any[]) => string;
/** Data that can be resolved to give a string. This can either be a Function or a Promise. */
export declare type PromiseResolvable<T> = stringCallback | eventHandler | Promise<T>;
export declare function EnsurePromise<T>(func: ((...args: any[]) => T) | Promise<T>, ...args: any[]): Promise<T> | undefined;
