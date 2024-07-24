"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.single = void 0;
const EmptyError_1 = require("../util/EmptyError");
const SequenceError_1 = require("../util/SequenceError");
const NotFoundError_1 = require("../util/NotFoundError");
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
function single(predicate) {
    return (0, lift_1.operate)((source, subscriber) => {
        let hasValue = false;
        let singleValue;
        let seenValue = false;
        let index = 0;
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
            seenValue = true;
            if (!predicate || predicate(value, index++, source)) {
                hasValue && subscriber.error(new SequenceError_1.SequenceError('Too many matching values'));
                hasValue = true;
                singleValue = value;
            }
        }, () => {
            if (hasValue) {
                subscriber.next(singleValue);
                subscriber.complete();
            }
            else {
                subscriber.error(seenValue ? new NotFoundError_1.NotFoundError('No matching values') : new EmptyError_1.EmptyError());
            }
        }));
    });
}
exports.single = single;
//# sourceMappingURL=single.js.map