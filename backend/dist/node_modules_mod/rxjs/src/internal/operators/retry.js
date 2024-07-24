"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retry = void 0;
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
const identity_1 = require("../util/identity");
const timer_1 = require("../observable/timer");
const innerFrom_1 = require("../observable/innerFrom");
function retry(configOrCount = Infinity) {
    let config;
    if (configOrCount && typeof configOrCount === 'object') {
        config = configOrCount;
    }
    else {
        config = {
            count: configOrCount,
        };
    }
    const { count = Infinity, delay, resetOnSuccess: resetOnSuccess = false } = config;
    return count <= 0
        ? identity_1.identity
        : (0, lift_1.operate)((source, subscriber) => {
            let soFar = 0;
            let innerSub;
            const subscribeForRetry = () => {
                let syncUnsub = false;
                innerSub = source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
                    if (resetOnSuccess) {
                        soFar = 0;
                    }
                    subscriber.next(value);
                }, undefined, (err) => {
                    if (soFar++ < count) {
                        const resub = () => {
                            if (innerSub) {
                                innerSub.unsubscribe();
                                innerSub = null;
                                subscribeForRetry();
                            }
                            else {
                                syncUnsub = true;
                            }
                        };
                        if (delay != null) {
                            const notifier = typeof delay === 'number' ? (0, timer_1.timer)(delay) : (0, innerFrom_1.innerFrom)(delay(err, soFar));
                            const notifierSubscriber = (0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, () => {
                                notifierSubscriber.unsubscribe();
                                resub();
                            }, () => {
                                subscriber.complete();
                            });
                            notifier.subscribe(notifierSubscriber);
                        }
                        else {
                            resub();
                        }
                    }
                    else {
                        subscriber.error(err);
                    }
                }));
                if (syncUnsub) {
                    innerSub.unsubscribe();
                    innerSub = null;
                    subscribeForRetry();
                }
            };
            subscribeForRetry();
        });
}
exports.retry = retry;
//# sourceMappingURL=retry.js.map