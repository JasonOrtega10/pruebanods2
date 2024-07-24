"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skipUntil = void 0;
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
const innerFrom_1 = require("../observable/innerFrom");
const noop_1 = require("../util/noop");
function skipUntil(notifier) {
    return (0, lift_1.operate)((source, subscriber) => {
        let taking = false;
        const skipSubscriber = (0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, () => {
            skipSubscriber === null || skipSubscriber === void 0 ? void 0 : skipSubscriber.unsubscribe();
            taking = true;
        }, noop_1.noop);
        (0, innerFrom_1.innerFrom)(notifier).subscribe(skipSubscriber);
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => taking && subscriber.next(value)));
    });
}
exports.skipUntil = skipUntil;
//# sourceMappingURL=skipUntil.js.map