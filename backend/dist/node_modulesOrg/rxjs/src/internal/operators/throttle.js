"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = exports.defaultThrottleConfig = void 0;
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
const innerFrom_1 = require("../observable/innerFrom");
exports.defaultThrottleConfig = {
    leading: true,
    trailing: false,
};
function throttle(durationSelector, config = exports.defaultThrottleConfig) {
    return (0, lift_1.operate)((source, subscriber) => {
        const { leading, trailing } = config;
        let hasValue = false;
        let sendValue = null;
        let throttled = null;
        let isComplete = false;
        const endThrottling = () => {
            throttled === null || throttled === void 0 ? void 0 : throttled.unsubscribe();
            throttled = null;
            if (trailing) {
                send();
                isComplete && subscriber.complete();
            }
        };
        const cleanupThrottling = () => {
            throttled = null;
            isComplete && subscriber.complete();
        };
        const startThrottle = (value) => (throttled = (0, innerFrom_1.innerFrom)(durationSelector(value)).subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, endThrottling, cleanupThrottling)));
        const send = () => {
            if (hasValue) {
                hasValue = false;
                const value = sendValue;
                sendValue = null;
                subscriber.next(value);
                !isComplete && startThrottle(value);
            }
        };
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
            hasValue = true;
            sendValue = value;
            !(throttled && !throttled.closed) && (leading ? send() : startThrottle(value));
        }, () => {
            isComplete = true;
            !(trailing && hasValue && throttled && !throttled.closed) && subscriber.complete();
        }));
    });
}
exports.throttle = throttle;
//# sourceMappingURL=throttle.js.map