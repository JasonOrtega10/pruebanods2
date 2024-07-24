"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repeat = void 0;
const empty_1 = require("../observable/empty");
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
const innerFrom_1 = require("../observable/innerFrom");
const timer_1 = require("../observable/timer");
function repeat(countOrConfig) {
    let count = Infinity;
    let delay;
    if (countOrConfig != null) {
        if (typeof countOrConfig === 'object') {
            ({ count = Infinity, delay } = countOrConfig);
        }
        else {
            count = countOrConfig;
        }
    }
    return count <= 0
        ? () => empty_1.EMPTY
        : (0, lift_1.operate)((source, subscriber) => {
            let soFar = 0;
            let sourceSub;
            const resubscribe = () => {
                sourceSub === null || sourceSub === void 0 ? void 0 : sourceSub.unsubscribe();
                sourceSub = null;
                if (delay != null) {
                    const notifier = typeof delay === 'number' ? (0, timer_1.timer)(delay) : (0, innerFrom_1.innerFrom)(delay(soFar));
                    const notifierSubscriber = (0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, () => {
                        notifierSubscriber.unsubscribe();
                        subscribeToSource();
                    });
                    notifier.subscribe(notifierSubscriber);
                }
                else {
                    subscribeToSource();
                }
            };
            const subscribeToSource = () => {
                let syncUnsub = false;
                sourceSub = source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, undefined, () => {
                    if (++soFar < count) {
                        if (sourceSub) {
                            resubscribe();
                        }
                        else {
                            syncUnsub = true;
                        }
                    }
                    else {
                        subscriber.complete();
                    }
                }));
                if (syncUnsub) {
                    resubscribe();
                }
            };
            subscribeToSource();
        });
}
exports.repeat = repeat;
//# sourceMappingURL=repeat.js.map