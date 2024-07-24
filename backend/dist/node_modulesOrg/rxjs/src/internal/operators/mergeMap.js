"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeMap = void 0;
const map_1 = require("./map");
const innerFrom_1 = require("../observable/innerFrom");
const lift_1 = require("../util/lift");
const mergeInternals_1 = require("./mergeInternals");
const isFunction_1 = require("../util/isFunction");
function mergeMap(project, resultSelector, concurrent = Infinity) {
    if ((0, isFunction_1.isFunction)(resultSelector)) {
        return mergeMap((a, i) => (0, map_1.map)((b, ii) => resultSelector(a, b, i, ii))((0, innerFrom_1.innerFrom)(project(a, i))), concurrent);
    }
    else if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
    }
    return (0, lift_1.operate)((source, subscriber) => (0, mergeInternals_1.mergeInternals)(source, subscriber, project, concurrent));
}
exports.mergeMap = mergeMap;
//# sourceMappingURL=mergeMap.js.map