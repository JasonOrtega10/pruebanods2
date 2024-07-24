"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filter = void 0;
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
function filter(predicate, thisArg) {
    return (0, lift_1.operate)((source, subscriber) => {
        let index = 0;
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => predicate.call(thisArg, value, index++) && subscriber.next(value)));
    });
}
exports.filter = filter;
//# sourceMappingURL=filter.js.map