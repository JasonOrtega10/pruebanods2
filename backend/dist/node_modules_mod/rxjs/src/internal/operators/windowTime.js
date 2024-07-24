"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.windowTime = void 0;
const Subject_1 = require("../Subject");
const async_1 = require("../scheduler/async");
const Subscription_1 = require("../Subscription");
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
const arrRemove_1 = require("../util/arrRemove");
const args_1 = require("../util/args");
const executeSchedule_1 = require("../util/executeSchedule");
function windowTime(windowTimeSpan, ...otherArgs) {
    var _a, _b;
    const scheduler = (_a = (0, args_1.popScheduler)(otherArgs)) !== null && _a !== void 0 ? _a : async_1.asyncScheduler;
    const windowCreationInterval = (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
    const maxWindowSize = otherArgs[1] || Infinity;
    return (0, lift_1.operate)((source, subscriber) => {
        let windowRecords = [];
        let restartOnClose = false;
        const closeWindow = (record) => {
            const { window, subs } = record;
            window.complete();
            subs.unsubscribe();
            (0, arrRemove_1.arrRemove)(windowRecords, record);
            restartOnClose && startWindow();
        };
        const startWindow = () => {
            if (windowRecords) {
                const subs = new Subscription_1.Subscription();
                subscriber.add(subs);
                const window = new Subject_1.Subject();
                const record = {
                    window,
                    subs,
                    seen: 0,
                };
                windowRecords.push(record);
                subscriber.next(window.asObservable());
                (0, executeSchedule_1.executeSchedule)(subs, scheduler, () => closeWindow(record), windowTimeSpan);
            }
        };
        if (windowCreationInterval !== null && windowCreationInterval >= 0) {
            (0, executeSchedule_1.executeSchedule)(subscriber, scheduler, startWindow, windowCreationInterval, true);
        }
        else {
            restartOnClose = true;
        }
        startWindow();
        const loop = (cb) => windowRecords.slice().forEach(cb);
        const terminate = (cb) => {
            loop(({ window }) => cb(window));
            cb(subscriber);
            subscriber.unsubscribe();
        };
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
            loop((record) => {
                record.window.next(value);
                maxWindowSize <= ++record.seen && closeWindow(record);
            });
        }, () => terminate((consumer) => consumer.complete()), (err) => terminate((consumer) => consumer.error(err))));
        return () => {
            windowRecords = null;
        };
    });
}
exports.windowTime = windowTime;
//# sourceMappingURL=windowTime.js.map