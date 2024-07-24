"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distinctUntilChanged = void 0;
const identity_1 = require("../util/identity");
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
function distinctUntilChanged(comparator, keySelector = identity_1.identity) {
    comparator = comparator !== null && comparator !== void 0 ? comparator : defaultCompare;
    return (0, lift_1.operate)((source, subscriber) => {
        let previousKey;
        let first = true;
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
            const currentKey = keySelector(value);
            if (first || !comparator(previousKey, currentKey)) {
                first = false;
                previousKey = currentKey;
                subscriber.next(value);
            }
        }));
    });
}
exports.distinctUntilChanged = distinctUntilChanged;
function defaultCompare(a, b) {
    return a === b;
}
//# sourceMappingURL=distinctUntilChanged.js.map