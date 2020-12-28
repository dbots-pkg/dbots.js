/**
 * Data that can be resolved to give a Discord ID, this can be:
 * * A string
 * * A number
 * * Any value with an `id` key
 */
export declare type IDResolvable = string | number | Record<'id', string>;
/**
 * Data that can be resolved to give a finite and positive integer.
 * This can include any value that can be parsed into an integer.
 */
export declare type CountResolvable = any;
/** Just a utility type representing an object */
export declare type AnyObject = Record<string, any>;
/**
 * Enforces a type on its argument
 * @private
 */
export declare function assert<T>(value: any): asserts value is T;
/**
 * Contains various general-purpose utility methods.
 */
export declare class Util {
    constructor();
    /**
     * Resolves data into a Discord ID.
     * @param data The data to resolve
     */
    static resolveID(data: IDResolvable): string;
    /**
     * Resolves data into a countable number that is finite and positive.
     * @param data The data to resolve
     */
    static resolveCount(data: CountResolvable): number;
}
