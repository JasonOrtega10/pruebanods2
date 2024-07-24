"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.of = void 0;
const args_1 = require("../util/args");
const from_1 = require("./from");
function of(...args) {
    const scheduler = (0, args_1.popScheduler)(args);
    return (0, from_1.from)(args, scheduler);
}
exports.of = of;
//# sourceMappingURL=of.js.map