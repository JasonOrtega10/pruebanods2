"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.observeOn = void 0;
const executeSchedule_1 = require("../util/executeSchedule");
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
function observeOn(scheduler, delay = 0) {
    return (0, lift_1.operate)((source, subscriber) => {
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => (0, executeSchedule_1.executeSchedule)(subscriber, scheduler, () => subscriber.next(value), delay), () => (0, executeSchedule_1.executeSchedule)(subscriber, scheduler, () => subscriber.complete(), delay), (err) => (0, executeSchedule_1.executeSchedule)(subscriber, scheduler, () => subscriber.error(err), delay)));
    });
}
exports.observeOn = observeOn;
//# sourceMappingURL=observeOn.js.map