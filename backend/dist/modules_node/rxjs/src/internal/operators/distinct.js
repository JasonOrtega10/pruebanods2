"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distinct = void 0;
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
const noop_1 = require("../util/noop");
const innerFrom_1 = require("../observable/innerFrom");
function distinct(keySelector, flushes) {
    return (0, lift_1.operate)((source, subscriber) => {
        const distinctKeys = new Set();
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
            const key = keySelector ? keySelector(value) : value;
            if (!distinctKeys.has(key)) {
                distinctKeys.add(key);
                subscriber.next(value);
            }
        }));
        flushes && (0, innerFrom_1.innerFrom)(flushes).subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, () => distinctKeys.clear(), noop_1.noop));
    });
}
exports.distinct = distinct;
//# sourceMappingURL=distinct.js.map