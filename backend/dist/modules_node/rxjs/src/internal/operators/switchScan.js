"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchScan = void 0;
const switchMap_1 = require("./switchMap");
const lift_1 = require("../util/lift");
function switchScan(accumulator, seed) {
    return (0, lift_1.operate)((source, subscriber) => {
        let state = seed;
        (0, switchMap_1.switchMap)((value, index) => accumulator(state, value, index), (_, innerValue) => ((state = innerValue), innerValue))(source).subscribe(subscriber);
        return () => {
            state = null;
        };
    });
}
exports.switchScan = switchScan;
//# sourceMappingURL=switchScan.js.map