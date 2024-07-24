"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withLatestFrom = void 0;
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
const innerFrom_1 = require("../observable/innerFrom");
const identity_1 = require("../util/identity");
const noop_1 = require("../util/noop");
const args_1 = require("../util/args");
function withLatestFrom(...inputs) {
    const project = (0, args_1.popResultSelector)(inputs);
    return (0, lift_1.operate)((source, subscriber) => {
        const len = inputs.length;
        const otherValues = new Array(len);
        let hasValue = inputs.map(() => false);
        let ready = false;
        for (let i = 0; i < len; i++) {
            (0, innerFrom_1.innerFrom)(inputs[i]).subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
                otherValues[i] = value;
                if (!ready && !hasValue[i]) {
                    hasValue[i] = true;
                    (ready = hasValue.every(identity_1.identity)) && (hasValue = null);
                }
            }, noop_1.noop));
        }
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
            if (ready) {
                const values = [value, ...otherValues];
                subscriber.next(project ? project(...values) : values);
            }
        }));
    });
}
exports.withLatestFrom = withLatestFrom;
//# sourceMappingURL=withLatestFrom.js.map