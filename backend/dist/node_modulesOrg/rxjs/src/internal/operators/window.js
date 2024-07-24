"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.window = void 0;
const Subject_1 = require("../Subject");
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
const noop_1 = require("../util/noop");
const innerFrom_1 = require("../observable/innerFrom");
function window(windowBoundaries) {
    return (0, lift_1.operate)((source, subscriber) => {
        let windowSubject = new Subject_1.Subject();
        subscriber.next(windowSubject.asObservable());
        const errorHandler = (err) => {
            windowSubject.error(err);
            subscriber.error(err);
        };
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => windowSubject === null || windowSubject === void 0 ? void 0 : windowSubject.next(value), () => {
            windowSubject.complete();
            subscriber.complete();
        }, errorHandler));
        (0, innerFrom_1.innerFrom)(windowBoundaries).subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, () => {
            windowSubject.complete();
            subscriber.next((windowSubject = new Subject_1.Subject()));
        }, noop_1.noop, errorHandler));
        return () => {
            windowSubject === null || windowSubject === void 0 ? void 0 : windowSubject.unsubscribe();
            windowSubject = null;
        };
    });
}
exports.window = window;
//# sourceMappingURL=window.js.map