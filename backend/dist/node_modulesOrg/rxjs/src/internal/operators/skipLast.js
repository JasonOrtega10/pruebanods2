"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skipLast = void 0;
const identity_1 = require("../util/identity");
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
function skipLast(skipCount) {
    return skipCount <= 0
        ?
            identity_1.identity
        : (0, lift_1.operate)((source, subscriber) => {
            let ring = new Array(skipCount);
            let seen = 0;
            source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
                const valueIndex = seen++;
                if (valueIndex < skipCount) {
                    ring[valueIndex] = value;
                }
                else {
                    const index = valueIndex % skipCount;
                    const oldValue = ring[index];
                    ring[index] = value;
                    subscriber.next(oldValue);
                }
            }));
            return () => {
                ring = null;
            };
        });
}
exports.skipLast = skipLast;
//# sourceMappingURL=skipLast.js.map