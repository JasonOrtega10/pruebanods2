"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retryWhen = void 0;
const innerFrom_1 = require("../observable/innerFrom");
const Subject_1 = require("../Subject");
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
function retryWhen(notifier) {
    return (0, lift_1.operate)((source, subscriber) => {
        let innerSub;
        let syncResub = false;
        let errors$;
        const subscribeForRetryWhen = () => {
            innerSub = source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, undefined, undefined, (err) => {
                if (!errors$) {
                    errors$ = new Subject_1.Subject();
                    (0, innerFrom_1.innerFrom)(notifier(errors$)).subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, () => innerSub ? subscribeForRetryWhen() : (syncResub = true)));
                }
                if (errors$) {
                    errors$.next(err);
                }
            }));
            if (syncResub) {
                innerSub.unsubscribe();
                innerSub = null;
                syncResub = false;
                subscribeForRetryWhen();
            }
        };
        subscribeForRetryWhen();
    });
}
exports.retryWhen = retryWhen;
//# sourceMappingURL=retryWhen.js.map