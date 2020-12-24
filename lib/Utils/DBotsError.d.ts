/// <reference types="node" />
export declare const codeSymbol: unique symbol;
export declare const messages: Map<"INVALID_POSTER_OPTIONS" | "NO_CLIENT_OR_ID" | "UNKNOWN_CLIENT" | "NO_CLIENT" | "NO_API_KEYS" | "SERVICE_NO_KEY" | "INVALID_SERVICE" | "HANDLER_INVALID" | "UNSUPPORTED_EVENT" | "CALLED_FROM_BASE" | "REQUIRES_TOKEN" | "POSTING_UNSUPPORTED" | "INVALID_ID" | "INVALID_COUNT" | "COUNT_NEGATIVE" | "GENERIC", string | ((...args: any[]) => string)>;
/**
 * Register an error code and message.
 * @param sym Unique name for the error
 * @param val Value of the error
 */
export declare function register(sym: errorKey, val: any): void;
declare type errorKey = keyof typeof messageObject;
declare const messageObject: {
    INVALID_POSTER_OPTIONS: string;
    NO_CLIENT_OR_ID: string;
    UNKNOWN_CLIENT: (count_name: string) => string;
    NO_CLIENT: (count_name: string) => string;
    NO_API_KEYS: string;
    SERVICE_NO_KEY: (service: string) => string;
    INVALID_SERVICE: (service: string) => string;
    HANDLER_INVALID: string;
    UNSUPPORTED_EVENT: (action: string) => string;
    CALLED_FROM_BASE: string;
    REQUIRES_TOKEN: string;
    POSTING_UNSUPPORTED: (service: string) => string;
    INVALID_ID: string;
    INVALID_COUNT: string;
    COUNT_NEGATIVE: string;
    GENERIC: (err: string) => string;
};
export declare const errors: {
    Error: {
        new (key: errorKey, ...args: any[]): {
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
        new (key: errorKey, ...args: any[]): {
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
        new (key: errorKey, ...args: any[]): {
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
export {};
