"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.every = void 0;
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
function every(predicate, thisArg) {
    return (0, lift_1.operate)((source, subscriber) => {
        let index = 0;
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
            if (!predicate.call(thisArg, value, index++, source)) {
                subscriber.next(false);
                subscriber.complete();
            }
        }, () => {
            subscriber.next(true);
            subscriber.complete();
        }));
    });
}
exports.every = every;
//# sourceMappingURL=every.js.map