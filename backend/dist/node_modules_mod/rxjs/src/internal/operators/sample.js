"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sample = void 0;
const innerFrom_1 = require("../observable/innerFrom");
const lift_1 = require("../util/lift");
const noop_1 = require("../util/noop");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
function sample(notifier) {
    return (0, lift_1.operate)((source, subscriber) => {
        let hasValue = false;
        let lastValue = null;
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
            hasValue = true;
            lastValue = value;
        }));
        (0, innerFrom_1.innerFrom)(notifier).subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, () => {
            if (hasValue) {
                hasValue = false;
                const value = lastValue;
                lastValue = null;
                subscriber.next(value);
            }
        }, noop_1.noop));
    });
}
exports.sample = sample;
//# sourceMappingURL=sample.js.map