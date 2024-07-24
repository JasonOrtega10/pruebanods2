"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeout = exports.TimeoutError = void 0;
const async_1 = require("../scheduler/async");
const isDate_1 = require("../util/isDate");
const lift_1 = require("../util/lift");
const innerFrom_1 = require("../observable/innerFrom");
const createErrorClass_1 = require("../util/createErrorClass");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
const executeSchedule_1 = require("../util/executeSchedule");
exports.TimeoutError = (0, createErrorClass_1.createErrorClass)((_super) => function TimeoutErrorImpl(info = null) {
    _super(this);
    this.message = 'Timeout has occurred';
    this.name = 'TimeoutError';
    this.info = info;
});
function timeout(config, schedulerArg) {
    const { first, each, with: _with = timeoutErrorFactory, scheduler = schedulerArg !== null && schedulerArg !== void 0 ? schedulerArg : async_1.asyncScheduler, meta = null, } = ((0, isDate_1.isValidDate)(config) ? { first: config } : typeof config === 'number' ? { each: config } : config);
    if (first == null && each == null) {
        throw new TypeError('No timeout provided.');
    }
    return (0, lift_1.operate)((source, subscriber) => {
        let originalSourceSubscription;
        let timerSubscription;
        let lastValue = null;
        let seen = 0;
        const startTimer = (delay) => {
            timerSubscription = (0, executeSchedule_1.executeSchedule)(subscriber, scheduler, () => {
                try {
                    originalSourceSubscription.unsubscribe();
                    (0, innerFrom_1.innerFrom)(_with({
                        meta,
                        lastValue,
                        seen,
                    })).subscribe(subscriber);
                }
                catch (err) {
                    subscriber.error(err);
                }
            }, delay);
        };
        originalSourceSubscription = source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
            timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
            seen++;
            subscriber.next((lastValue = value));
            each > 0 && startTimer(each);
        }, undefined, undefined, () => {
            if (!(timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.closed)) {
                timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
            }
            lastValue = null;
        }));
        !seen && startTimer(first != null ? (typeof first === 'number' ? first : +first - scheduler.now()) : each);
    });
}
exports.timeout = timeout;
function timeoutErrorFactory(info) {
    throw new exports.TimeoutError(info);
}
//# sourceMappingURL=timeout.js.map