"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.map = void 0;
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
function map(project, thisArg) {
    return (0, lift_1.operate)((source, subscriber) => {
        let index = 0;
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
            subscriber.next(project.call(thisArg, value, index++));
        }));
    });
}
exports.map = map;
//# sourceMappingURL=map.js.map