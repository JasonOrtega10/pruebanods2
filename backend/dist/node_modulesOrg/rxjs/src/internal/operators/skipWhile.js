"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skipWhile = void 0;
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
function skipWhile(predicate) {
    return (0, lift_1.operate)((source, subscriber) => {
        let taking = false;
        let index = 0;
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => (taking || (taking = !predicate(value, index++))) && subscriber.next(value)));
    });
}
exports.skipWhile = skipWhile;
//# sourceMappingURL=skipWhile.js.map