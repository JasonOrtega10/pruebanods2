"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scan = void 0;
const lift_1 = require("../util/lift");
const scanInternals_1 = require("./scanInternals");
function scan(accumulator, seed) {
    return (0, lift_1.operate)((0, scanInternals_1.scanInternals)(accumulator, seed, arguments.length >= 2, true));
}
exports.scan = scan;
//# sourceMappingURL=scan.js.map