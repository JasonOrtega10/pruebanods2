"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buffer = void 0;
const lift_1 = require("../util/lift");
const noop_1 = require("../util/noop");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
const innerFrom_1 = require("../observable/innerFrom");
function buffer(closingNotifier) {
    return (0, lift_1.operate)((source, subscriber) => {
        let currentBuffer = [];
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => currentBuffer.push(value), () => {
            subscriber.next(currentBuffer);
            subscriber.complete();
        }));
        (0, innerFrom_1.innerFrom)(closingNotifier).subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, () => {
            const b = currentBuffer;
            currentBuffer = [];
            subscriber.next(b);
        }, noop_1.noop));
        return () => {
            currentBuffer = null;
        };
    });
}
exports.buffer = buffer;
//# sourceMappingURL=buffer.js.map