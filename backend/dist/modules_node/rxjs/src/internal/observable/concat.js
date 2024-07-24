"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concat = void 0;
const concatAll_1 = require("../operators/concatAll");
const args_1 = require("../util/args");
const from_1 = require("./from");
function concat(...args) {
    return (0, concatAll_1.concatAll)()((0, from_1.from)(args, (0, args_1.popScheduler)(args)));
}
exports.concat = concat;
//# sourceMappingURL=concat.js.map