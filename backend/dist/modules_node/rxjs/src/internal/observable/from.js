"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.from = void 0;
const scheduled_1 = require("../scheduled/scheduled");
const innerFrom_1 = require("./innerFrom");
function from(input, scheduler) {
    return scheduler ? (0, scheduled_1.scheduled)(input, scheduler) : (0, innerFrom_1.innerFrom)(input);
}
exports.from = from;
//# sourceMappingURL=from.js.map