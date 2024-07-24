"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onErrorResumeNext = void 0;
const Observable_1 = require("../Observable");
const argsOrArgArray_1 = require("../util/argsOrArgArray");
const OperatorSubscriber_1 = require("../operators/OperatorSubscriber");
const noop_1 = require("../util/noop");
const innerFrom_1 = require("./innerFrom");
function onErrorResumeNext(...sources) {
    const nextSources = (0, argsOrArgArray_1.argsOrArgArray)(sources);
    return new Observable_1.Observable((subscriber) => {
        let sourceIndex = 0;
        const subscribeNext = () => {
            if (sourceIndex < nextSources.length) {
                let nextSource;
                try {
                    nextSource = (0, innerFrom_1.innerFrom)(nextSources[sourceIndex++]);
                }
                catch (err) {
                    subscribeNext();
                    return;
                }
                const innerSubscriber = new OperatorSubscriber_1.OperatorSubscriber(subscriber, undefined, noop_1.noop, noop_1.noop);
                nextSource.subscribe(innerSubscriber);
                innerSubscriber.add(subscribeNext);
            }
            else {
                subscriber.complete();
            }
        };
        subscribeNext();
    });
}
exports.onErrorResumeNext = onErrorResumeNext;
//# sourceMappingURL=onErrorResumeNext.js.map