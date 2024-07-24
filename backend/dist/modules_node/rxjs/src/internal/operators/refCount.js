"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refCount = void 0;
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
function refCount() {
    return (0, lift_1.operate)((source, subscriber) => {
        let connection = null;
        source._refCount++;
        const refCounter = (0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, undefined, undefined, undefined, () => {
            if (!source || source._refCount <= 0 || 0 < --source._refCount) {
                connection = null;
                return;
            }
            const sharedConnection = source._connection;
            const conn = connection;
            connection = null;
            if (sharedConnection && (!conn || sharedConnection === conn)) {
                sharedConnection.unsubscribe();
            }
            subscriber.unsubscribe();
        });
        source.subscribe(refCounter);
        if (!refCounter.closed) {
            connection = source.connect();
        }
    });
}
exports.refCount = refCount;
//# sourceMappingURL=refCount.js.map