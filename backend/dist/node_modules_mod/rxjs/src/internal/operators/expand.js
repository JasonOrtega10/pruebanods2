"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expand = void 0;
const lift_1 = require("../util/lift");
const mergeInternals_1 = require("./mergeInternals");
function expand(project, concurrent = Infinity, scheduler) {
    concurrent = (concurrent || 0) < 1 ? Infinity : concurrent;
    return (0, lift_1.operate)((source, subscriber) => (0, mergeInternals_1.mergeInternals)(source, subscriber, project, concurrent, undefined, true, scheduler));
}
exports.expand = expand;
//# sourceMappingURL=expand.js.map