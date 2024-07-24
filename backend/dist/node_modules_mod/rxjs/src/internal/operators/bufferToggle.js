"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bufferToggle = void 0;
const Subscription_1 = require("../Subscription");
const lift_1 = require("../util/lift");
const innerFrom_1 = require("../observable/innerFrom");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
const noop_1 = require("../util/noop");
const arrRemove_1 = require("../util/arrRemove");
function bufferToggle(openings, closingSelector) {
    return (0, lift_1.operate)((source, subscriber) => {
        const buffers = [];
        (0, innerFrom_1.innerFrom)(openings).subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (openValue) => {
            const buffer = [];
            buffers.push(buffer);
            const closingSubscription = new Subscription_1.Subscription();
            const emitBuffer = () => {
                (0, arrRemove_1.arrRemove)(buffers, buffer);
                subscriber.next(buffer);
                closingSubscription.unsubscribe();
            };
            closingSubscription.add((0, innerFrom_1.innerFrom)(closingSelector(openValue)).subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, emitBuffer, noop_1.noop)));
        }, noop_1.noop));
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
            for (const buffer of buffers) {
                buffer.push(value);
            }
        }, () => {
            while (buffers.length > 0) {
                subscriber.next(buffers.shift());
            }
            subscriber.complete();
        }));
    });
}
exports.bufferToggle = bufferToggle;
//# sourceMappingURL=bufferToggle.js.map