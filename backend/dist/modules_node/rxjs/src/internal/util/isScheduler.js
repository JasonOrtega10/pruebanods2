"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isScheduler = void 0;
const isFunction_1 = require("./isFunction");
function isScheduler(value) {
    return value && (0, isFunction_1.isFunction)(value.schedule);
}
exports.isScheduler = isScheduler;
//# sourceMappingURL=isScheduler.js.map