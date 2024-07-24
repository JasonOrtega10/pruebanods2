"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partition = void 0;
const not_1 = require("../util/not");
const filter_1 = require("../operators/filter");
const innerFrom_1 = require("./innerFrom");
function partition(source, predicate, thisArg) {
    return [(0, filter_1.filter)(predicate, thisArg)((0, innerFrom_1.innerFrom)(source)), (0, filter_1.filter)((0, not_1.not)(predicate, thisArg))((0, innerFrom_1.innerFrom)(source))];
}
exports.partition = partition;
//# sourceMappingURL=partition.js.map