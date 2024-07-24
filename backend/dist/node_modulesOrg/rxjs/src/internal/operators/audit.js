"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.audit = void 0;
const lift_1 = require("../util/lift");
const innerFrom_1 = require("../observable/innerFrom");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
function audit(durationSelector) {
    return (0, lift_1.operate)((source, subscriber) => {
        let hasValue = false;
        let lastValue = null;
        let durationSubscriber = null;
        let isComplete = false;
        const endDuration = () => {
            durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
            durationSubscriber = null;
            if (hasValue) {
                hasValue = false;
                const value = lastValue;
                lastValue = null;
                subscriber.next(value);
            }
            isComplete && subscriber.complete();
        };
        const cleanupDuration = () => {
            durationSubscriber = null;
            isComplete && subscriber.complete();
        };
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
            hasValue = true;
            lastValue = value;
            if (!durationSubscriber) {
                (0, innerFrom_1.innerFrom)(durationSelector(value)).subscribe((durationSubscriber = (0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, endDuration, cleanupDuration)));
            }
        }, () => {
            isComplete = true;
            (!hasValue || !durationSubscriber || durationSubscriber.closed) && subscriber.complete();
        }));
    });
}
exports.audit = audit;
//# sourceMappingURL=audit.js.map