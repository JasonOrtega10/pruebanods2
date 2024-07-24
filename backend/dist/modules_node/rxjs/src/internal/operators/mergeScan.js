"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeScan = void 0;
const lift_1 = require("../util/lift");
const mergeInternals_1 = require("./mergeInternals");
function mergeScan(accumulator, seed, concurrent = Infinity) {
    return (0, lift_1.operate)((source, subscriber) => {
        let state = seed;
        return (0, mergeInternals_1.mergeInternals)(source, subscriber, (value, index) => accumulator(state, value, index), concurrent, (value) => {
            state = value;
        }, false, undefined, () => (state = null));
    });
}
exports.mergeScan = mergeScan;
//# sourceMappingURL=mergeScan.js.map