"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pairs = void 0;
const from_1 = require("./from");
function pairs(obj, scheduler) {
    return (0, from_1.from)(Object.entries(obj), scheduler);
}
exports.pairs = pairs;
//# sourceMappingURL=pairs.js.map