"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFind = exports.find = void 0;
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
function find(predicate, thisArg) {
    return (0, lift_1.operate)(createFind(predicate, thisArg, 'value'));
}
exports.find = find;
function createFind(predicate, thisArg, emit) {
    const findIndex = emit === 'index';
    return (source, subscriber) => {
        let index = 0;
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
            const i = index++;
            if (predicate.call(thisArg, value, i, source)) {
                subscriber.next(findIndex ? i : value);
                subscriber.complete();
            }
        }, () => {
            subscriber.next(findIndex ? -1 : undefined);
            subscriber.complete();
        }));
    };
}
exports.createFind = createFind;
//# sourceMappingURL=find.js.map