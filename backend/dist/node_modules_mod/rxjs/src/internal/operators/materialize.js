"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.materialize = void 0;
const Notification_1 = require("../Notification");
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
function materialize() {
    return (0, lift_1.operate)((source, subscriber) => {
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
            subscriber.next(Notification_1.Notification.createNext(value));
        }, () => {
            subscriber.next(Notification_1.Notification.createComplete());
            subscriber.complete();
        }, (err) => {
            subscriber.next(Notification_1.Notification.createError(err));
            subscriber.complete();
        }));
    });
}
exports.materialize = materialize;
//# sourceMappingURL=materialize.js.map