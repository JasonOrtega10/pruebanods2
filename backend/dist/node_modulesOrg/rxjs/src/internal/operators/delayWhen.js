"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delayWhen = void 0;
const concat_1 = require("../observable/concat");
const take_1 = require("./take");
const ignoreElements_1 = require("./ignoreElements");
const mapTo_1 = require("./mapTo");
const mergeMap_1 = require("./mergeMap");
const innerFrom_1 = require("../observable/innerFrom");
function delayWhen(delayDurationSelector, subscriptionDelay) {
    if (subscriptionDelay) {
        return (source) => (0, concat_1.concat)(subscriptionDelay.pipe((0, take_1.take)(1), (0, ignoreElements_1.ignoreElements)()), source.pipe(delayWhen(delayDurationSelector)));
    }
    return (0, mergeMap_1.mergeMap)((value, index) => (0, innerFrom_1.innerFrom)(delayDurationSelector(value, index)).pipe((0, take_1.take)(1), (0, mapTo_1.mapTo)(value)));
}
exports.delayWhen = delayWhen;
//# sourceMappingURL=delayWhen.js.map