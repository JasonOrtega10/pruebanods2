"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchMapTo = void 0;
const switchMap_1 = require("./switchMap");
const isFunction_1 = require("../util/isFunction");
function switchMapTo(innerObservable, resultSelector) {
    return (0, isFunction_1.isFunction)(resultSelector) ? (0, switchMap_1.switchMap)(() => innerObservable, resultSelector) : (0, switchMap_1.switchMap)(() => innerObservable);
}
exports.switchMapTo = switchMapTo;
//# sourceMappingURL=switchMapTo.js.map