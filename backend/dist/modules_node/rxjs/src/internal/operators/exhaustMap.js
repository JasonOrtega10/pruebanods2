"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exhaustMap = void 0;
const map_1 = require("./map");
const innerFrom_1 = require("../observable/innerFrom");
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
function exhaustMap(project, resultSelector) {
    if (resultSelector) {
        return (source) => source.pipe(exhaustMap((a, i) => (0, innerFrom_1.innerFrom)(project(a, i)).pipe((0, map_1.map)((b, ii) => resultSelector(a, b, i, ii)))));
    }
    return (0, lift_1.operate)((source, subscriber) => {
        let index = 0;
        let innerSub = null;
        let isComplete = false;
        source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (outerValue) => {
            if (!innerSub) {
                innerSub = (0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, undefined, () => {
                    innerSub = null;
                    isComplete && subscriber.complete();
                });
                (0, innerFrom_1.innerFrom)(project(outerValue, index++)).subscribe(innerSub);
            }
        }, () => {
            isComplete = true;
            !innerSub && subscriber.complete();
        }));
    });
}
exports.exhaustMap = exhaustMap;
//# sourceMappingURL=exhaustMap.js.map