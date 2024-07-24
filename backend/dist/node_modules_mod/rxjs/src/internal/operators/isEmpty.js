"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = void 0;
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
function isEmpty() {
    return (0, lift_1.operate)((source, subscriber) => {
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, () => {
            subscriber.next(false);
            subscriber.complete();
        }, () => {
            subscriber.next(true);
            subscriber.complete();
        }));
    });
}
exports.isEmpty = isEmpty;
//# sourceMappingURL=isEmpty.js.map