"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.raceInit = exports.race = void 0;
const Observable_1 = require("../Observable");
const innerFrom_1 = require("./innerFrom");
const argsOrArgArray_1 = require("../util/argsOrArgArray");
const OperatorSubscriber_1 = require("../operators/OperatorSubscriber");
function race(...sources) {
    sources = (0, argsOrArgArray_1.argsOrArgArray)(sources);
    return sources.length === 1 ? (0, innerFrom_1.innerFrom)(sources[0]) : new Observable_1.Observable(raceInit(sources));
}
exports.race = race;
function raceInit(sources) {
    return (subscriber) => {
        let subscriptions = [];
        for (let i = 0; subscriptions && !subscriber.closed && i < sources.length; i++) {
            subscriptions.push((0, innerFrom_1.innerFrom)(sources[i]).subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
                if (subscriptions) {
                    for (let s = 0; s < subscriptions.length; s++) {
                        s !== i && subscriptions[s].unsubscribe();
                    }
                    subscriptions = null;
                }
                subscriber.next(value);
            })));
        }
    };
}
exports.raceInit = raceInit;
//# sourceMappingURL=race.js.map