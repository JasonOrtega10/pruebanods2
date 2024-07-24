"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromReadableStreamLike = exports.fromAsyncIterable = exports.fromIterable = exports.fromPromise = exports.fromArrayLike = exports.fromInteropObservable = exports.innerFrom = void 0;
const isArrayLike_1 = require("../util/isArrayLike");
const isPromise_1 = require("../util/isPromise");
const Observable_1 = require("../Observable");
const isInteropObservable_1 = require("../util/isInteropObservable");
const isAsyncIterable_1 = require("../util/isAsyncIterable");
const throwUnobservableError_1 = require("../util/throwUnobservableError");
const isIterable_1 = require("../util/isIterable");
const isReadableStreamLike_1 = require("../util/isReadableStreamLike");
const isFunction_1 = require("../util/isFunction");
const reportUnhandledError_1 = require("../util/reportUnhandledError");
const observable_1 = require("../symbol/observable");
function innerFrom(input) {
    if (input instanceof Observable_1.Observable) {
        return input;
    }
    if (input != null) {
        if ((0, isInteropObservable_1.isInteropObservable)(input)) {
            return fromInteropObservable(input);
        }
        if ((0, isArrayLike_1.isArrayLike)(input)) {
            return fromArrayLike(input);
        }
        if ((0, isPromise_1.isPromise)(input)) {
            return fromPromise(input);
        }
        if ((0, isAsyncIterable_1.isAsyncIterable)(input)) {
            return fromAsyncIterable(input);
        }
        if ((0, isIterable_1.isIterable)(input)) {
            return fromIterable(input);
        }
        if ((0, isReadableStreamLike_1.isReadableStreamLike)(input)) {
            return fromReadableStreamLike(input);
        }
    }
    throw (0, throwUnobservableError_1.createInvalidObservableTypeError)(input);
}
exports.innerFrom = innerFrom;
function fromInteropObservable(obj) {
    return new Observable_1.Observable((subscriber) => {
        const obs = obj[observable_1.observable]();
        if ((0, isFunction_1.isFunction)(obs.subscribe)) {
            return obs.subscribe(subscriber);
        }
        throw new TypeError('Provided object does not correctly implement Symbol.observable');
    });
}
exports.fromInteropObservable = fromInteropObservable;
function fromArrayLike(array) {
    return new Observable_1.Observable((subscriber) => {
        for (let i = 0; i < array.length && !subscriber.closed; i++) {
            subscriber.next(array[i]);
        }
        subscriber.complete();
    });
}
exports.fromArrayLike = fromArrayLike;
function fromPromise(promise) {
    return new Observable_1.Observable((subscriber) => {
        promise
            .then((value) => {
            if (!subscriber.closed) {
                subscriber.next(value);
                subscriber.complete();
            }
        }, (err) => subscriber.error(err))
            .then(null, reportUnhandledError_1.reportUnhandledError);
    });
}
exports.fromPromise = fromPromise;
function fromIterable(iterable) {
    return new Observable_1.Observable((subscriber) => {
        for (const value of iterable) {
            subscriber.next(value);
            if (subscriber.closed) {
                return;
            }
        }
        subscriber.complete();
    });
}
exports.fromIterable = fromIterable;
function fromAsyncIterable(asyncIterable) {
    return new Observable_1.Observable((subscriber) => {
        process(asyncIterable, subscriber).catch((err) => subscriber.error(err));
    });
}
exports.fromAsyncIterable = fromAsyncIterable;
function fromReadableStreamLike(readableStream) {
    return fromAsyncIterable((0, isReadableStreamLike_1.readableStreamLikeToAsyncGenerator)(readableStream));
}
exports.fromReadableStreamLike = fromReadableStreamLike;
async function process(asyncIterable, subscriber) {
    var _a, e_1, _b, _c;
    try {
        for (var _d = true, asyncIterable_1 = __asyncValues(asyncIterable), asyncIterable_1_1; asyncIterable_1_1 = await asyncIterable_1.next(), _a = asyncIterable_1_1.done, !_a;) {
            _c = asyncIterable_1_1.value;
            _d = false;
            try {
                const value = _c;
                subscriber.next(value);
                if (subscriber.closed) {
                    return;
                }
            }
            finally {
                _d = true;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = asyncIterable_1.return)) await _b.call(asyncIterable_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    subscriber.complete();
}
//# sourceMappingURL=innerFrom.js.map