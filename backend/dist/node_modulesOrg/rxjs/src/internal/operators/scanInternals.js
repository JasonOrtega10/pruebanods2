"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanInternals = void 0;
const OperatorSubscriber_1 = require("./OperatorSubscriber");
function scanInternals(accumulator, seed, hasSeed, emitOnNext, emitBeforeComplete) {
    return (source, subscriber) => {
        let hasState = hasSeed;
        let state = seed;
        let index = 0;
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
            const i = index++;
            state = hasState
                ?
                    accumulator(state, value, i)
                :
                    ((hasState = true), value);
            emitOnNext && subscriber.next(state);
        }, emitBeforeComplete &&
            (() => {
                hasState && subscriber.next(state);
                subscriber.complete();
            })));
    };
}
exports.scanInternals = scanInternals;
//# sourceMappingURL=scanInternals.js.map