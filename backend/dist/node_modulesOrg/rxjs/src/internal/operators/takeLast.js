"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.takeLast = void 0;
const empty_1 = require("../observable/empty");
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
function takeLast(count) {
    return count <= 0
        ? () => empty_1.EMPTY
        : (0, lift_1.operate)((source, subscriber) => {
            let buffer = [];
            source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
                buffer.push(value);
                count < buffer.length && buffer.shift();
            }, () => {
                for (const value of buffer) {
                    subscriber.next(value);
                }
                subscriber.complete();
            }, undefined, () => {
                buffer = null;
            }));
        });
}
exports.takeLast = takeLast;
//# sourceMappingURL=takeLast.js.map