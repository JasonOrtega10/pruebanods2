"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineLatestInit = exports.combineLatest = void 0;
const Observable_1 = require("../Observable");
const argsArgArrayOrObject_1 = require("../util/argsArgArrayOrObject");
const from_1 = require("./from");
const identity_1 = require("../util/identity");
const mapOneOrManyArgs_1 = require("../util/mapOneOrManyArgs");
const args_1 = require("../util/args");
const createObject_1 = require("../util/createObject");
const OperatorSubscriber_1 = require("../operators/OperatorSubscriber");
const executeSchedule_1 = require("../util/executeSchedule");
function combineLatest(...args) {
    const scheduler = (0, args_1.popScheduler)(args);
    const resultSelector = (0, args_1.popResultSelector)(args);
    const { args: observables, keys } = (0, argsArgArrayOrObject_1.argsArgArrayOrObject)(args);
    if (observables.length === 0) {
        return (0, from_1.from)([], scheduler);
    }
    const result = new Observable_1.Observable(combineLatestInit(observables, scheduler, keys
        ?
            (values) => (0, createObject_1.createObject)(keys, values)
        :
            identity_1.identity));
    return resultSelector ? result.pipe((0, mapOneOrManyArgs_1.mapOneOrManyArgs)(resultSelector)) : result;
}
exports.combineLatest = combineLatest;
function combineLatestInit(observables, scheduler, valueTransform = identity_1.identity) {
    return (subscriber) => {
        maybeSchedule(scheduler, () => {
            const { length } = observables;
            const values = new Array(length);
            let active = length;
            let remainingFirstValues = length;
            for (let i = 0; i < length; i++) {
                maybeSchedule(scheduler, () => {
                    const source = (0, from_1.from)(observables[i], scheduler);
                    let hasFirstValue = false;
                    source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
                        values[i] = value;
                        if (!hasFirstValue) {
                            hasFirstValue = true;
                            remainingFirstValues--;
                        }
                        if (!remainingFirstValues) {
                            subscriber.next(valueTransform(values.slice()));
                        }
                    }, () => {
                        if (!--active) {
                            subscriber.complete();
                        }
                    }));
                }, subscriber);
            }
        }, subscriber);
    };
}
exports.combineLatestInit = combineLatestInit;
function maybeSchedule(scheduler, execute, subscription) {
    if (scheduler) {
        (0, executeSchedule_1.executeSchedule)(subscription, scheduler, execute);
    }
    else {
        execute();
    }
}
//# sourceMappingURL=combineLatest.js.map