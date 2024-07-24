"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dematerialize = void 0;
const Notification_1 = require("../Notification");
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
function dematerialize() {
    return (0, lift_1.operate)((source, subscriber) => {
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (notification) => (0, Notification_1.observeNotification)(notification, subscriber)));
    });
}
exports.dematerialize = dematerialize;
//# sourceMappingURL=dematerialize.js.map