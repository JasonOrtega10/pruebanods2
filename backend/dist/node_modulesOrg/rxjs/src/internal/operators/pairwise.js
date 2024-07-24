"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pairwise = void 0;
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
function pairwise() {
    return (0, lift_1.operate)((source, subscriber) => {
        let prev;
        let hasPrev = false;
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
            const p = prev;
            prev = value;
            hasPrev && subscriber.next([p, value]);
            hasPrev = true;
        }));
    });
}
exports.pairwise = pairwise;
//# sourceMappingURL=pairwise.js.map