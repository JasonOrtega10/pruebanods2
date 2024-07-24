"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concatMapTo = void 0;
const concatMap_1 = require("./concatMap");
const isFunction_1 = require("../util/isFunction");
function concatMapTo(innerObservable, resultSelector) {
    return (0, isFunction_1.isFunction)(resultSelector) ? (0, concatMap_1.concatMap)(() => innerObservable, resultSelector) : (0, concatMap_1.concatMap)(() => innerObservable);
}
exports.concatMapTo = concatMapTo;
//# sourceMappingURL=concatMapTo.js.map