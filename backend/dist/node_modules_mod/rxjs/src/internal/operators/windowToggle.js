"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.windowToggle = void 0;
const Subject_1 = require("../Subject");
const Subscription_1 = require("../Subscription");
const lift_1 = require("../util/lift");
const innerFrom_1 = require("../observable/innerFrom");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
const noop_1 = require("../util/noop");
const arrRemove_1 = require("../util/arrRemove");
function windowToggle(openings, closingSelector) {
    return (0, lift_1.operate)((source, subscriber) => {
        const windows = [];
        const handleError = (err) => {
            while (0 < windows.length) {
                windows.shift().error(err);
            }
            subscriber.error(err);
        };
        (0, innerFrom_1.innerFrom)(openings).subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (openValue) => {
            const window = new Subject_1.Subject();
            windows.push(window);
            const closingSubscription = new Subscription_1.Subscription();
            const closeWindow = () => {
                (0, arrRemove_1.arrRemove)(windows, window);
                window.complete();
                closingSubscription.unsubscribe();
            };
            let closingNotifier;
            try {
                closingNotifier = (0, innerFrom_1.innerFrom)(closingSelector(openValue));
            }
            catch (err) {
                handleError(err);
                return;
            }
            subscriber.next(window.asObservable());
            closingSubscription.add(closingNotifier.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, closeWindow, noop_1.noop, handleError)));
        }, noop_1.noop));
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
            const windowsCopy = windows.slice();
            for (const window of windowsCopy) {
                window.next(value);
            }
        }, () => {
            while (0 < windows.length) {
                windows.shift().complete();
            }
            subscriber.complete();
        }, handleError, () => {
            while (0 < windows.length) {
                windows.shift().unsubscribe();
            }
        }));
    });
}
exports.windowToggle = windowToggle;
//# sourceMappingURL=windowToggle.js.map