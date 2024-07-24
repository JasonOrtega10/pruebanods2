"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.takeUntil = void 0;
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
const innerFrom_1 = require("../observable/innerFrom");
const noop_1 = require("../util/noop");
function takeUntil(notifier) {
    return (0, lift_1.operate)((source, subscriber) => {
        (0, innerFrom_1.innerFrom)(notifier).subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, () => subscriber.complete(), noop_1.noop));
        !subscriber.closed && source.subscribe(subscriber);
    });
}
exports.takeUntil = takeUntil;
//# sourceMappingURL=takeUntil.js.map