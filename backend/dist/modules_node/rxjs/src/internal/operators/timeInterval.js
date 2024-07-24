"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeInterval = exports.timeInterval = void 0;
const async_1 = require("../scheduler/async");
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
function timeInterval(scheduler = async_1.asyncScheduler) {
    return (0, lift_1.operate)((source, subscriber) => {
        let last = scheduler.now();
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
            const now = scheduler.now();
            const interval = now - last;
            last = now;
            subscriber.next(new TimeInterval(value, interval));
        }));
    });
}
exports.timeInterval = timeInterval;
class TimeInterval {
    constructor(value, interval) {
        this.value = value;
        this.interval = interval;
    }
}
exports.TimeInterval = TimeInterval;
//# sourceMappingURL=timeInterval.js.map