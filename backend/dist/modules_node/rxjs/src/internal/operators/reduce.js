"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduce = void 0;
const scanInternals_1 = require("./scanInternals");
const lift_1 = require("../util/lift");
function reduce(accumulator, seed) {
    return (0, lift_1.operate)((0, scanInternals_1.scanInternals)(accumulator, seed, arguments.length >= 2, false, true));
}
exports.reduce = reduce;
//# sourceMappingURL=reduce.js.map