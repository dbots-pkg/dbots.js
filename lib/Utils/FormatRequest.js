"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatRequest = void 0;
var axios_1 = __importDefault(require("axios"));
var Constants_1 = require("./Constants");
/**
 * Returns a request.
 * @param opts An object containing the config for the request: only basic properties are documented, but all [Axios](https://github.com/axios/axios#request-config) parameters are valid
 * @returns The request
 */
function FormatRequest(options) {
    var opts = options;
    if (!opts.method)
        opts.method = 'get';
    // This is no longer needed, because the types enforce the correct properties
    // if (opts.body) {
    //   opts.data = opts.body
    //   delete opts.body
    // }
    // if (opts.query) {
    //   opts.params = opts.query
    //   delete opts.query
    // }
    var userAgent = "dbots (https://github.com/dbots-pkg/dbots.js " + Constants_1.Package.version + ") Node.js/" + process.version;
    if (!opts.headers)
        opts.headers = {
            'User-Agent': userAgent
        };
    else if (!opts.headers['User-Agent'])
        opts.headers['User-Agent'] = userAgent;
    return axios_1.default(opts);
}
exports.FormatRequest = FormatRequest;
