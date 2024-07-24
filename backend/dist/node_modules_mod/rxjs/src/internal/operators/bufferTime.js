"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bufferTime = void 0;
const Subscription_1 = require("../Subscription");
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
const arrRemove_1 = require("../util/arrRemove");
const async_1 = require("../scheduler/async");
const args_1 = require("../util/args");
const executeSchedule_1 = require("../util/executeSchedule");
function bufferTime(bufferTimeSpan, ...otherArgs) {
    var _a, _b;
    const scheduler = (_a = (0, args_1.popScheduler)(otherArgs)) !== null && _a !== void 0 ? _a : async_1.asyncScheduler;
    const bufferCreationInterval = (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
    const maxBufferSize = otherArgs[1] || Infinity;
    return (0, lift_1.operate)((source, subscriber) => {
        let bufferRecords = [];
        let restartOnEmit = false;
        const emit = (record) => {
            const { buffer, subs } = record;
            subs.unsubscribe();
            (0, arrRemove_1.arrRemove)(bufferRecords, record);
            subscriber.next(buffer);
            restartOnEmit && startBuffer();
        };
        const startBuffer = () => {
            if (bufferRecords) {
                const subs = new Subscription_1.Subscription();
                subscriber.add(subs);
                const buffer = [];
                const record = {
                    buffer,
                    subs,
                };
                bufferRecords.push(record);
                (0, executeSchedule_1.executeSchedule)(subs, scheduler, () => emit(record), bufferTimeSpan);
            }
        };
        if (bufferCreationInterval !== null && bufferCreationInterval >= 0) {
            (0, executeSchedule_1.executeSchedule)(subscriber, scheduler, startBuffer, bufferCreationInterval, true);
        }
        else {
            restartOnEmit = true;
        }
        startBuffer();
        const bufferTimeSubscriber = (0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
            const recordsCopy = bufferRecords.slice();
            for (const record of recordsCopy) {
                const { buffer } = record;
                buffer.push(value);
                maxBufferSize <= buffer.length && emit(record);
            }
        }, () => {
            while (bufferRecords === null || bufferRecords === void 0 ? void 0 : bufferRecords.length) {
                subscriber.next(bufferRecords.shift().buffer);
            }
            bufferTimeSubscriber === null || bufferTimeSubscriber === void 0 ? void 0 : bufferTimeSubscriber.unsubscribe();
            subscriber.complete();
            subscriber.unsubscribe();
        }, undefined, () => (bufferRecords = null));
        source.subscribe(bufferTimeSubscriber);
    });
}
exports.bufferTime = bufferTime;
//# sourceMappingURL=bufferTime.js.map