"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeMapTo = void 0;
const mergeMap_1 = require("./mergeMap");
const isFunction_1 = require("../util/isFunction");
function mergeMapTo(innerObservable, resultSelector, concurrent = Infinity) {
    if ((0, isFunction_1.isFunction)(resultSelector)) {
        return (0, mergeMap_1.mergeMap)(() => innerObservable, resultSelector, concurrent);
    }
    if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
    }
    return (0, mergeMap_1.mergeMap)(() => innerObservable, concurrent);
}
exports.mergeMapTo = mergeMapTo;
//# sourceMappingURL=mergeMapTo.js.map