"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = void 0;
const lift_1 = require("../util/lift");
const noop_1 = require("../util/noop");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
const innerFrom_1 = require("../observable/innerFrom");
function debounce(durationSelector) {
    return (0, lift_1.operate)((source, subscriber) => {
        let hasValue = false;
        let lastValue = null;
        let durationSubscriber = null;
        const emit = () => {
            durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
            durationSubscriber = null;
            if (hasValue) {
                hasValue = false;
                const value = lastValue;
                lastValue = null;
                subscriber.next(value);
            }
        };
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
            durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
            hasValue = true;
            lastValue = value;
            durationSubscriber = (0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, emit, noop_1.noop);
            (0, innerFrom_1.innerFrom)(durationSelector(value)).subscribe(durationSubscriber);
        }, () => {
            emit();
            subscriber.complete();
        }, undefined, () => {
            lastValue = durationSubscriber = null;
        }));
    });
}
exports.debounce = debounce;
//# sourceMappingURL=debounce.js.map