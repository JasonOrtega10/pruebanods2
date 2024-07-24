"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.share = void 0;
const innerFrom_1 = require("../observable/innerFrom");
const Subject_1 = require("../Subject");
const Subscriber_1 = require("../Subscriber");
const lift_1 = require("../util/lift");
function share(options = {}) {
    const { connector = () => new Subject_1.Subject(), resetOnError = true, resetOnComplete = true, resetOnRefCountZero = true } = options;
    return (wrapperSource) => {
        let connection;
        let resetConnection;
        let subject;
        let refCount = 0;
        let hasCompleted = false;
        let hasErrored = false;
        const cancelReset = () => {
            resetConnection === null || resetConnection === void 0 ? void 0 : resetConnection.unsubscribe();
            resetConnection = undefined;
        };
        const reset = () => {
            cancelReset();
            connection = subject = undefined;
            hasCompleted = hasErrored = false;
        };
        const resetAndUnsubscribe = () => {
            const conn = connection;
            reset();
            conn === null || conn === void 0 ? void 0 : conn.unsubscribe();
        };
        return (0, lift_1.operate)((source, subscriber) => {
            refCount++;
            if (!hasErrored && !hasCompleted) {
                cancelReset();
            }
            const dest = (subject = subject !== null && subject !== void 0 ? subject : connector());
            subscriber.add(() => {
                refCount--;
                if (refCount === 0 && !hasErrored && !hasCompleted) {
                    resetConnection = handleReset(resetAndUnsubscribe, resetOnRefCountZero);
                }
            });
            dest.subscribe(subscriber);
            if (!connection &&
                refCount > 0) {
                connection = new Subscriber_1.SafeSubscriber({
                    next: (value) => dest.next(value),
                    error: (err) => {
                        hasErrored = true;
                        cancelReset();
                        resetConnection = handleReset(reset, resetOnError, err);
                        dest.error(err);
                    },
                    complete: () => {
                        hasCompleted = true;
                        cancelReset();
                        resetConnection = handleReset(reset, resetOnComplete);
                        dest.complete();
                    },
                });
                (0, innerFrom_1.innerFrom)(source).subscribe(connection);
            }
        })(wrapperSource);
    };
}
exports.share = share;
function handleReset(reset, on, ...args) {
    if (on === true) {
        reset();
        return;
    }
    if (on === false) {
        return;
    }
    const onSubscriber = new Subscriber_1.SafeSubscriber({
        next: () => {
            onSubscriber.unsubscribe();
            reset();
        },
    });
    return (0, innerFrom_1.innerFrom)(on(...args)).subscribe(onSubscriber);
}
//# sourceMappingURL=share.js.map