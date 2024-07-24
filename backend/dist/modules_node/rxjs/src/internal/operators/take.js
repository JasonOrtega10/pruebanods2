"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.take = void 0;
const empty_1 = require("../observable/empty");
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
function take(count) {
    return count <= 0
        ?
            () => empty_1.EMPTY
        : (0, lift_1.operate)((source, subscriber) => {
            let seen = 0;
            source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
                if (++seen <= count) {
                    subscriber.next(value);
                    if (count <= seen) {
                        subscriber.complete();
                    }
                }
            }));
        });
}
exports.take = take;
//# sourceMappingURL=take.js.map