"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounceTime = void 0;
const async_1 = require("../scheduler/async");
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
function debounceTime(dueTime, scheduler = async_1.asyncScheduler) {
    return (0, lift_1.operate)((source, subscriber) => {
        let activeTask = null;
        let lastValue = null;
        let lastTime = null;
        const emit = () => {
            if (activeTask) {
                activeTask.unsubscribe();
                activeTask = null;
                const value = lastValue;
                lastValue = null;
                subscriber.next(value);
            }
        };
        function emitWhenIdle() {
            const targetTime = lastTime + dueTime;
            const now = scheduler.now();
            if (now < targetTime) {
                activeTask = this.schedule(undefined, targetTime - now);
                subscriber.add(activeTask);
                return;
            }
            emit();
        }
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
            lastValue = value;
            lastTime = scheduler.now();
            if (!activeTask) {
                activeTask = scheduler.schedule(emitWhenIdle, dueTime);
                subscriber.add(activeTask);
            }
        }, () => {
            emit();
            subscriber.complete();
        }, undefined, () => {
            lastValue = activeTask = null;
        }));
    });
}
exports.debounceTime = debounceTime;
//# sourceMappingURL=debounceTime.js.map