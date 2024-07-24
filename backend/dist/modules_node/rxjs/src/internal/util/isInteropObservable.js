"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInteropObservable = void 0;
const observable_1 = require("../symbol/observable");
const isFunction_1 = require("./isFunction");
function isInteropObservable(input) {
    return (0, isFunction_1.isFunction)(input[observable_1.observable]);
}
exports.isInteropObservable = isInteropObservable;
//# sourceMappingURL=isInteropObservable.js.map