"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduled = void 0;
const scheduleObservable_1 = require("./scheduleObservable");
const schedulePromise_1 = require("./schedulePromise");
const scheduleArray_1 = require("./scheduleArray");
const scheduleIterable_1 = require("./scheduleIterable");
const scheduleAsyncIterable_1 = require("./scheduleAsyncIterable");
const isInteropObservable_1 = require("../util/isInteropObservable");
const isPromise_1 = require("../util/isPromise");
const isArrayLike_1 = require("../util/isArrayLike");
const isIterable_1 = require("../util/isIterable");
const isAsyncIterable_1 = require("../util/isAsyncIterable");
const throwUnobservableError_1 = require("../util/throwUnobservableError");
const isReadableStreamLike_1 = require("../util/isReadableStreamLike");
const scheduleReadableStreamLike_1 = require("./scheduleReadableStreamLike");
function scheduled(input, scheduler) {
    if (input != null) {
        if ((0, isInteropObservable_1.isInteropObservable)(input)) {
            return (0, scheduleObservable_1.scheduleObservable)(input, scheduler);
        }
        if ((0, isArrayLike_1.isArrayLike)(input)) {
            return (0, scheduleArray_1.scheduleArray)(input, scheduler);
        }
        if ((0, isPromise_1.isPromise)(input)) {
            return (0, schedulePromise_1.schedulePromise)(input, scheduler);
        }
        if ((0, isAsyncIterable_1.isAsyncIterable)(input)) {
            return (0, scheduleAsyncIterable_1.scheduleAsyncIterable)(input, scheduler);
        }
        if ((0, isIterable_1.isIterable)(input)) {
            return (0, scheduleIterable_1.scheduleIterable)(input, scheduler);
        }
        if ((0, isReadableStreamLike_1.isReadableStreamLike)(input)) {
            return (0, scheduleReadableStreamLike_1.scheduleReadableStreamLike)(input, scheduler);
        }
    }
    throw (0, throwUnobservableError_1.createInvalidObservableTypeError)(input);
}
exports.scheduled = scheduled;
//# sourceMappingURL=scheduled.js.map