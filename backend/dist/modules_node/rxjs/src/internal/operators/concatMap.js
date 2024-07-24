"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concatMap = void 0;
const mergeMap_1 = require("./mergeMap");
const isFunction_1 = require("../util/isFunction");
function concatMap(project, resultSelector) {
    return (0, isFunction_1.isFunction)(resultSelector) ? (0, mergeMap_1.mergeMap)(project, resultSelector, 1) : (0, mergeMap_1.mergeMap)(project, 1);
}
exports.concatMap = concatMap;
//# sourceMappingURL=concatMap.js.map