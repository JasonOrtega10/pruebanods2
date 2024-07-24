"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttleTime = void 0;
const async_1 = require("../scheduler/async");
const throttle_1 = require("./throttle");
const timer_1 = require("../observable/timer");
function throttleTime(duration, scheduler = async_1.asyncScheduler, config = throttle_1.defaultThrottleConfig) {
    const duration$ = (0, timer_1.timer)(duration, scheduler);
    return (0, throttle_1.throttle)(() => duration$, config);
}
exports.throttleTime = throttleTime;
//# sourceMappingURL=throttleTime.js.map