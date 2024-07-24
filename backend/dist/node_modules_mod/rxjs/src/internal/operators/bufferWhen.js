"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bufferWhen = void 0;
const lift_1 = require("../util/lift");
const noop_1 = require("../util/noop");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
const innerFrom_1 = require("../observable/innerFrom");
function bufferWhen(closingSelector) {
    return (0, lift_1.operate)((source, subscriber) => {
        let buffer = null;
        let closingSubscriber = null;
        const openBuffer = () => {
            closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
            const b = buffer;
            buffer = [];
            b && subscriber.next(b);
            (0, innerFrom_1.innerFrom)(closingSelector()).subscribe((closingSubscriber = (0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, openBuffer, noop_1.noop)));
        };
        openBuffer();
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => buffer === null || buffer === void 0 ? void 0 : buffer.push(value), () => {
            buffer && subscriber.next(buffer);
            subscriber.complete();
        }, undefined, () => (buffer = closingSubscriber = null)));
    });
}
exports.bufferWhen = bufferWhen;
//# sourceMappingURL=bufferWhen.js.map