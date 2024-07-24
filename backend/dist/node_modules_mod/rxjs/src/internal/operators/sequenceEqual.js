"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequenceEqual = void 0;
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
const innerFrom_1 = require("../observable/innerFrom");
function sequenceEqual(compareTo, comparator = (a, b) => a === b) {
    return (0, lift_1.operate)((source, subscriber) => {
        const aState = createState();
        const bState = createState();
        const emit = (isEqual) => {
            subscriber.next(isEqual);
            subscriber.complete();
        };
        const createSubscriber = (selfState, otherState) => {
            const sequenceEqualSubscriber = (0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (a) => {
                const { buffer, complete } = otherState;
                if (buffer.length === 0) {
                    complete ? emit(false) : selfState.buffer.push(a);
                }
                else {
                    !comparator(a, buffer.shift()) && emit(false);
                }
            }, () => {
                selfState.complete = true;
                const { complete, buffer } = otherState;
                complete && emit(buffer.length === 0);
                sequenceEqualSubscriber === null || sequenceEqualSubscriber === void 0 ? void 0 : sequenceEqualSubscriber.unsubscribe();
            });
            return sequenceEqualSubscriber;
        };
        source.subscribe(createSubscriber(aState, bState));
        (0, innerFrom_1.innerFrom)(compareTo).subscribe(createSubscriber(bState, aState));
    });
}
exports.sequenceEqual = sequenceEqual;
function createState() {
    return {
        buffer: [],
        complete: false,
    };
}
//# sourceMappingURL=sequenceEqual.js.map