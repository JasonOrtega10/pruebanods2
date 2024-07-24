"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zip = void 0;
const Observable_1 = require("../Observable");
const innerFrom_1 = require("./innerFrom");
const argsOrArgArray_1 = require("../util/argsOrArgArray");
const empty_1 = require("./empty");
const OperatorSubscriber_1 = require("../operators/OperatorSubscriber");
const args_1 = require("../util/args");
function zip(...args) {
    const resultSelector = (0, args_1.popResultSelector)(args);
    const sources = (0, argsOrArgArray_1.argsOrArgArray)(args);
    return sources.length
        ? new Observable_1.Observable((subscriber) => {
            let buffers = sources.map(() => []);
            let completed = sources.map(() => false);
            subscriber.add(() => {
                buffers = completed = null;
            });
            for (let sourceIndex = 0; !subscriber.closed && sourceIndex < sources.length; sourceIndex++) {
                (0, innerFrom_1.innerFrom)(sources[sourceIndex]).subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, (value) => {
                    buffers[sourceIndex].push(value);
                    if (buffers.every((buffer) => buffer.length)) {
                        const result = buffers.map((buffer) => buffer.shift());
                        subscriber.next(resultSelector ? resultSelector(...result) : result);
                        if (buffers.some((buffer, i) => !buffer.length && completed[i])) {
                            subscriber.complete();
                        }
                    }
                }, () => {
                    completed[sourceIndex] = true;
                    !buffers[sourceIndex].length && subscriber.complete();
                }));
            }
            return () => {
                buffers = completed = null;
            };
        })
        : empty_1.EMPTY;
}
exports.zip = zip;
//# sourceMappingURL=zip.js.map