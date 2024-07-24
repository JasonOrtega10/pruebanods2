"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ignoreElements = void 0;
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
const noop_1 = require("../util/noop");
function ignoreElements() {
    return (0, lift_1.operate)((source, subscriber) => {
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, noop_1.noop));
    });
}
exports.ignoreElements = ignoreElements;
//# sourceMappingURL=ignoreElements.js.map