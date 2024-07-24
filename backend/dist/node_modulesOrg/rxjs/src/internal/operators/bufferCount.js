"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bufferCount = void 0;
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
const arrRemove_1 = require("../util/arrRemove");
function bufferCount(bufferSize, startBufferEvery = null) {
    startBufferEvery = startBufferEvery !== null && startBufferEvery !== void 0 ? startBufferEvery : bufferSize;
    return (0, lift_1.operate)((source, subscriber) => {
        let buffers = [];
        let count = 0;
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
            let toEmit = null;
            if (count++ % startBufferEvery === 0) {
                buffers.push([]);
            }
            for (const buffer of buffers) {
                buffer.push(value);
                if (bufferSize <= buffer.length) {
                    toEmit = toEmit !== null && toEmit !== void 0 ? toEmit : [];
                    toEmit.push(buffer);
                }
            }
            if (toEmit) {
                for (const buffer of toEmit) {
                    (0, arrRemove_1.arrRemove)(buffers, buffer);
                    subscriber.next(buffer);
                }
            }
        }, () => {
            for (const buffer of buffers) {
                subscriber.next(buffer);
            }
            subscriber.complete();
        }, undefined, () => {
            buffers = null;
        }));
    });
}
exports.bufferCount = bufferCount;
//# sourceMappingURL=bufferCount.js.map