"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleIterable = void 0;
const Observable_1 = require("../Observable");
const iterator_1 = require("../symbol/iterator");
const isFunction_1 = require("../util/isFunction");
const executeSchedule_1 = require("../util/executeSchedule");
function scheduleIterable(input, scheduler) {
    return new Observable_1.Observable((subscriber) => {
        let iterator;
        (0, executeSchedule_1.executeSchedule)(subscriber, scheduler, () => {
            iterator = input[iterator_1.iterator]();
            (0, executeSchedule_1.executeSchedule)(subscriber, scheduler, () => {
                let value;
                let done;
                try {
                    ({ value, done } = iterator.next());
                }
                catch (err) {
                    subscriber.error(err);
                    return;
                }
                if (done) {
                    subscriber.complete();
                }
                else {
                    subscriber.next(value);
                }
            }, 0, true);
        });
        return () => (0, isFunction_1.isFunction)(iterator === null || iterator === void 0 ? void 0 : iterator.return) && iterator.return();
    });
}
exports.scheduleIterable = scheduleIterable;
//# sourceMappingURL=scheduleIterable.js.map