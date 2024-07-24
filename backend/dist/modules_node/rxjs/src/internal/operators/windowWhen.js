"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.windowWhen = void 0;
const Subject_1 = require("../Subject");
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
const innerFrom_1 = require("../observable/innerFrom");
function windowWhen(closingSelector) {
    return (0, lift_1.operate)((source, subscriber) => {
        let window;
        let closingSubscriber;
        const handleError = (err) => {
            window.error(err);
            subscriber.error(err);
        };
        const openWindow = () => {
            closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
            window === null || window === void 0 ? void 0 : window.complete();
            window = new Subject_1.Subject();
            subscriber.next(window.asObservable());
            let closingNotifier;
            try {
                closingNotifier = (0, innerFrom_1.innerFrom)(closingSelector());
            }
            catch (err) {
                handleError(err);
                return;
            }
            closingNotifier.subscribe((closingSubscriber = (0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, openWindow, openWindow, handleError)));
        };
        openWindow();
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => window.next(value), () => {
            window.complete();
            subscriber.complete();
        }, handleError, () => {
            closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
            window = null;
        }));
    });
}
exports.windowWhen = windowWhen;
//# sourceMappingURL=windowWhen.js.map