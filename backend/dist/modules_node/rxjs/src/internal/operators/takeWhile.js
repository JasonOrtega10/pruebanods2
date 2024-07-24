"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.takeWhile = void 0;
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
function takeWhile(predicate, inclusive = false) {
    return (0, lift_1.operate)((source, subscriber) => {
        let index = 0;
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
            const result = predicate(value, index++);
            (result || inclusive) && subscriber.next(value);
            !result && subscriber.complete();
        }));
    });
}
exports.takeWhile = takeWhile;
//# sourceMappingURL=takeWhile.js.map