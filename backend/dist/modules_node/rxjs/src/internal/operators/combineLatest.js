"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineLatest = void 0;
const combineLatest_1 = require("../observable/combineLatest");
const lift_1 = require("../util/lift");
const argsOrArgArray_1 = require("../util/argsOrArgArray");
const mapOneOrManyArgs_1 = require("../util/mapOneOrManyArgs");
const pipe_1 = require("../util/pipe");
const args_1 = require("../util/args");
function combineLatest(...args) {
    const resultSelector = (0, args_1.popResultSelector)(args);
    return resultSelector
        ? (0, pipe_1.pipe)(combineLatest(...args), (0, mapOneOrManyArgs_1.mapOneOrManyArgs)(resultSelector))
        : (0, lift_1.operate)((source, subscriber) => {
            (0, combineLatest_1.combineLatestInit)([source, ...(0, argsOrArgArray_1.argsOrArgArray)(args)])(subscriber);
        });
}
exports.combineLatest = combineLatest;
//# sourceMappingURL=combineLatest.js.map