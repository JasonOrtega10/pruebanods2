"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultIfEmpty = void 0;
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
function defaultIfEmpty(defaultValue) {
    return (0, lift_1.operate)((source, subscriber) => {
        let hasValue = false;
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
            hasValue = true;
            subscriber.next(value);
        }, () => {
            if (!hasValue) {
                subscriber.next(defaultValue);
            }
            subscriber.complete();
        }));
    });
}
exports.defaultIfEmpty = defaultIfEmpty;
//# sourceMappingURL=defaultIfEmpty.js.map