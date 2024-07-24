"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forkJoin = void 0;
const Observable_1 = require("../Observable");
const argsArgArrayOrObject_1 = require("../util/argsArgArrayOrObject");
const innerFrom_1 = require("./innerFrom");
const args_1 = require("../util/args");
const OperatorSubscriber_1 = require("../operators/OperatorSubscriber");
const mapOneOrManyArgs_1 = require("../util/mapOneOrManyArgs");
const createObject_1 = require("../util/createObject");
function forkJoin(...args) {
    const resultSelector = (0, args_1.popResultSelector)(args);
    const { args: sources, keys } = (0, argsArgArrayOrObject_1.argsArgArrayOrObject)(args);
    const result = new Observable_1.Observable((subscriber) => {
        const { length } = sources;
        if (!length) {
            subscriber.complete();
            return;
        }
        const values = new Array(length);
        let remainingCompletions = length;
        let remainingEmissions = length;
        for (let sourceIndex = 0; sourceIndex < length; sourceIndex++) {
            let hasValue = false;
            (0, innerFrom_1.innerFrom)(sources[sourceIndex]).subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
                if (!hasValue) {
                    hasValue = true;
                    remainingEmissions--;
                }
                values[sourceIndex] = value;
            }, () => remainingCompletions--, undefined, () => {
                if (!remainingCompletions || !hasValue) {
                    if (!remainingEmissions) {
                        subscriber.next(keys ? (0, createObject_1.createObject)(keys, values) : values);
                    }
                    subscriber.complete();
                }
            }));
        }
    });
    return resultSelector ? result.pipe((0, mapOneOrManyArgs_1.mapOneOrManyArgs)(resultSelector)) : result;
}
exports.forkJoin = forkJoin;
//# sourceMappingURL=forkJoin.js.map