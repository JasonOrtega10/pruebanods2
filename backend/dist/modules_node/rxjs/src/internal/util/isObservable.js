"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObservable = void 0;
const Observable_1 = require("../Observable");
const isFunction_1 = require("./isFunction");
function isObservable(obj) {
    return !!obj && (obj instanceof Observable_1.Observable || ((0, isFunction_1.isFunction)(obj.lift) && (0, isFunction_1.isFunction)(obj.subscribe)));
}
exports.isObservable = isObservable;
//# sourceMappingURL=isObservable.js.map