"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupBy = void 0;
const Observable_1 = require("../Observable");
const innerFrom_1 = require("../observable/innerFrom");
const Subject_1 = require("../Subject");
const lift_1 = require("../util/lift");
const OperatorSubscriber_1 = require("./OperatorSubscriber");
function groupBy(keySelector, elementOrOptions, duration, connector) {
    return (0, lift_1.operate)((source, subscriber) => {
        let element;
        if (!elementOrOptions || typeof elementOrOptions === 'function') {
            element = elementOrOptions;
        }
        else {
            ({ duration, element, connector } = elementOrOptions);
        }
        const groups = new Map();
        const notify = (cb) => {
            groups.forEach(cb);
            cb(subscriber);
        };
        const handleError = (err) => notify((consumer) => consumer.error(err));
        let activeGroups = 0;
        let teardownAttempted = false;
        const groupBySourceSubscriber = new OperatorSubscriber_1.OperatorSubscriber(subscriber, (value) => {
            try {
                const key = keySelector(value);
                let group = groups.get(key);
                if (!group) {
                    groups.set(key, (group = connector ? connector() : new Subject_1.Subject()));
                    const grouped = createGroupedObservable(key, group);
                    subscriber.next(grouped);
                    if (duration) {
                        const durationSubscriber = (0, OperatorSubscriber_1.createOperatorSubscriber)(group, () => {
                            group.complete();
                            durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
                        }, undefined, undefined, () => groups.delete(key));
                        groupBySourceSubscriber.add((0, innerFrom_1.innerFrom)(duration(grouped)).subscribe(durationSubscriber));
                    }
                }
                group.next(element ? element(value) : value);
            }
            catch (err) {
                handleError(err);
            }
        }, () => notify((consumer) => consumer.complete()), handleError, () => groups.clear(), () => {
            teardownAttempted = true;
            return activeGroups === 0;
        });
        source.subscribe(groupBySourceSubscriber);
        function createGroupedObservable(key, groupSubject) {
            const result = new Observable_1.Observable((groupSubscriber) => {
                activeGroups++;
                const innerSub = groupSubject.subscribe(groupSubscriber);
                return () => {
                    innerSub.unsubscribe();
                    --activeGroups === 0 && teardownAttempted && groupBySourceSubscriber.unsubscribe();
                };
            });
            result.key = key;
            return result;
        }
    });
}
exports.groupBy = groupBy;
//# sourceMappingURL=groupBy.js.map