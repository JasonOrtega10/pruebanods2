"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeOn = void 0;
const lift_1 = require("../util/lift");
function subscribeOn(scheduler, delay = 0) {
    return (0, lift_1.operate)((source, subscriber) => {
        subscriber.add(scheduler.schedule(() => source.subscribe(subscriber), delay));
    });
}
exports.subscribeOn = subscribeOn;
//# sourceMappingURL=subscribeOn.js.map