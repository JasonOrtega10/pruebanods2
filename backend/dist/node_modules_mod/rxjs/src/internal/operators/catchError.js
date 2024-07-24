"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchError = void 0;
const innerFrom_1 = require("../observable/innerFrom");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
const lift_1 = require("../util/lift");
function catchError(selector) {
    return (0, lift_1.operate)((source, subscriber) => {
        let innerSub = null;
        let syncUnsub = false;
        let handledResult;
        innerSub = source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, undefined, undefined, (err) => {
            handledResult = (0, innerFrom_1.innerFrom)(selector(err, catchError(selector)(source)));
            if (innerSub) {
                innerSub.unsubscribe();
                innerSub = null;
                handledResult.subscribe(subscriber);
            }
            else {
                syncUnsub = true;
            }
        }));
        if (syncUnsub) {
            innerSub.unsubscribe();
            innerSub = null;
            handledResult.subscribe(subscriber);
        }
    });
}
exports.catchError = catchError;
//# sourceMappingURL=catchError.js.map