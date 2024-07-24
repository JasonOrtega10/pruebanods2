"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwIfEmpty = void 0;
const EmptyError_1 = require("../util/EmptyError");
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
function throwIfEmpty(errorFactory = defaultErrorFactory) {
    return (0, lift_1.operate)((source, subscriber) => {
        let hasValue = false;
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
            hasValue = true;
            subscriber.next(value);
        }, () => (hasValue ? subscriber.complete() : subscriber.error(errorFactory()))));
    });
}
exports.throwIfEmpty = throwIfEmpty;
function defaultErrorFactory() {
    return new EmptyError_1.EmptyError();
}
//# sourceMappingURL=throwIfEmpty.js.map