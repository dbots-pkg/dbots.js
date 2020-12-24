/// <reference types="node" />
export declare const codeSymbol: unique symbol;
export declare const messages: Map<any, any>;
/**
 * Register an error code and message.
 * @param sym Unique name for the error
 * @param val Value of the error
 */
export declare function register(sym: string, val: any): void;
export declare const errors: {
    Error: {
        new (key: string, ...args: any[]): {
            readonly name: string;
            readonly code: any;
            message: string;
            stack?: string | undefined;
        };
        captureStackTrace(targetObject: object, constructorOpt?: Function | undefined): void;
        prepareStackTrace?: ((err: Error, stackTraces: NodeJS.CallSite[]) => any) | undefined;
        stackTraceLimit: number;
    };
    TypeError: {
        new (key: string, ...args: any[]): {
            readonly name: string;
            readonly code: any;
            message: string;
            stack?: string | undefined;
        };
        captureStackTrace(targetObject: object, constructorOpt?: Function | undefined): void;
        prepareStackTrace?: ((err: Error, stackTraces: NodeJS.CallSite[]) => any) | undefined;
        stackTraceLimit: number;
    };
    RangeError: {
        new (key: string, ...args: any[]): {
            readonly name: string;
            readonly code: any;
            message: string;
            stack?: string | undefined;
        };
        captureStackTrace(targetObject: object, constructorOpt?: Function | undefined): void;
        prepareStackTrace?: ((err: Error, stackTraces: NodeJS.CallSite[]) => any) | undefined;
        stackTraceLimit: number;
    };
};
