"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = void 0;
const mergeAll_1 = require("../operators/mergeAll");
const innerFrom_1 = require("./innerFrom");
const empty_1 = require("./empty");
const args_1 = require("../util/args");
const from_1 = require("./from");
function merge(...args) {
    const scheduler = (0, args_1.popScheduler)(args);
    const concurrent = (0, args_1.popNumber)(args, Infinity);
    const sources = args;
    return !sources.length
        ?
            empty_1.EMPTY
        : sources.length === 1
            ?
                (0, innerFrom_1.innerFrom)(sources[0])
            :
                (0, mergeAll_1.mergeAll)(concurrent)((0, from_1.from)(sources, scheduler));
}
exports.merge = merge;
//# sourceMappingURL=merge.js.map