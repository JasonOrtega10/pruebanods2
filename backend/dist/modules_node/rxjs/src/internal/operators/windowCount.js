"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.windowCount = void 0;
const Subject_1 = require("../Subject");
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
function windowCount(windowSize, startWindowEvery = 0) {
    const startEvery = startWindowEvery > 0 ? startWindowEvery : windowSize;
    return (0, lift_1.operate)((source, subscriber) => {
        let windows = [new Subject_1.Subject()];
        let starts = [];
        let count = 0;
        subscriber.next(windows[0].asObservable());
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
            for (const window of windows) {
                window.next(value);
            }
            const c = count - windowSize + 1;
            if (c >= 0 && c % startEvery === 0) {
                windows.shift().complete();
            }
            if (++count % startEvery === 0) {
                const window = new Subject_1.Subject();
                windows.push(window);
                subscriber.next(window.asObservable());
            }
        }, () => {
            while (windows.length > 0) {
                windows.shift().complete();
            }
            subscriber.complete();
        }, (err) => {
            while (windows.length > 0) {
                windows.shift().error(err);
            }
            subscriber.error(err);
        }, () => {
            starts = null;
            windows = null;
        }));
    });
}
exports.windowCount = windowCount;
//# sourceMappingURL=windowCount.js.map