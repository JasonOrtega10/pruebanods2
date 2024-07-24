"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromFetch = void 0;
const OperatorSubscriber_1 = require("../../operators/OperatorSubscriber");
const Observable_1 = require("../../Observable");
const innerFrom_1 = require("../../observable/innerFrom");
function fromFetch(input, initWithSelector = {}) {
    const { selector } = initWithSelector, init = __rest(initWithSelector, ["selector"]);
    return new Observable_1.Observable((subscriber) => {
        const controller = new AbortController();
        const { signal } = controller;
        let abortable = true;
        const { signal: outerSignal } = init;
        if (outerSignal) {
            if (outerSignal.aborted) {
                controller.abort();
            }
            else {
                const outerSignalHandler = () => {
                    if (!signal.aborted) {
                        controller.abort();
                    }
                };
                outerSignal.addEventListener('abort', outerSignalHandler);
                subscriber.add(() => outerSignal.removeEventListener('abort', outerSignalHandler));
            }
        }
        const perSubscriberInit = Object.assign(Object.assign({}, init), { signal });
        const handleError = (err) => {
            abortable = false;
            subscriber.error(err);
        };
        fetch(input, perSubscriberInit)
            .then((response) => {
            if (selector) {
                (0, innerFrom_1.innerFrom)(selector(response)).subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subscriber, undefined, () => {
                    abortable = false;
                    subscriber.complete();
                }, handleError));
            }
            else {
                abortable = false;
                subscriber.next(response);
                subscriber.complete();
            }
        })
            .catch(handleError);
        return () => {
            if (abortable) {
                controller.abort();
            }
        };
    });
}
exports.fromFetch = fromFetch;
//# sourceMappingURL=fetch.js.map