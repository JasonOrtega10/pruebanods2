"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tap = void 0;
const isFunction_1 = require("../util/isFunction");
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
const identity_1 = require("../util/identity");
function tap(observerOrNext, error, complete) {
    const tapObserver = (0, isFunction_1.isFunction)(observerOrNext) || error || complete
        ?
            { next: observerOrNext, error, complete }
        : observerOrNext;
    return tapObserver
        ? (0, lift_1.operate)((source, subscriber) => {
            var _a;
            (_a = tapObserver.subscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
            let isUnsub = true;
            source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
                var _a;
                (_a = tapObserver.next) === null || _a === void 0 ? void 0 : _a.call(tapObserver, value);
                subscriber.next(value);
            }, () => {
                var _a;
                isUnsub = false;
                (_a = tapObserver.complete) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
                subscriber.complete();
            }, (err) => {
                var _a;
                isUnsub = false;
                (_a = tapObserver.error) === null || _a === void 0 ? void 0 : _a.call(tapObserver, err);
                subscriber.error(err);
            }, () => {
                var _a, _b;
                if (isUnsub) {
                    (_a = tapObserver.unsubscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
                }
                (_b = tapObserver.finalize) === null || _b === void 0 ? void 0 : _b.call(tapObserver);
            }));
        })
        :
            identity_1.identity;
}
exports.tap = tap;
//# sourceMappingURL=tap.js.map