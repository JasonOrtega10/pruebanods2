"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repeatWhen = void 0;
const innerFrom_1 = require("../observable/innerFrom");
const Subject_1 = require("../Subject");
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
function repeatWhen(notifier) {
    return (0, lift_1.operate)((source, subscriber) => {
        let innerSub;
        let syncResub = false;
        let completions$;
        let isNotifierComplete = false;
        let isMainComplete = false;
        const checkComplete = () => isMainComplete && isNotifierComplete && (subscriber.complete(), true);
        const getCompletionSubject = () => {
            if (!completions$) {
                completions$ = new Subject_1.Subject();
                (0, innerFrom_1.innerFrom)(notifier(completions$)).subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, () => {
                    if (innerSub) {
                        subscribeForRepeatWhen();
                    }
                    else {
                        syncResub = true;
                    }
                }, () => {
                    isNotifierComplete = true;
                    checkComplete();
                }));
            }
            return completions$;
        };
        const subscribeForRepeatWhen = () => {
            isMainComplete = false;
            innerSub = source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, undefined, () => {
                isMainComplete = true;
                !checkComplete() && getCompletionSubject().next();
            }));
            if (syncResub) {
                innerSub.unsubscribe();
                innerSub = null;
                syncResub = false;
                subscribeForRepeatWhen();
            }
        };
        subscribeForRepeatWhen();
    });
}
exports.repeatWhen = repeatWhen;
//# sourceMappingURL=repeatWhen.js.map