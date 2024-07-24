"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromEvent = void 0;
const innerFrom_1 = require("../observable/innerFrom");
const Observable_1 = require("../Observable");
const mergeMap_1 = require("../operators/mergeMap");
const isArrayLike_1 = require("../util/isArrayLike");
const isFunction_1 = require("../util/isFunction");
const mapOneOrManyArgs_1 = require("../util/mapOneOrManyArgs");
const nodeEventEmitterMethods = ['addListener', 'removeListener'];
const eventTargetMethods = ['addEventListener', 'removeEventListener'];
const jqueryMethods = ['on', 'off'];
function fromEvent(target, eventName, options, resultSelector) {
    if ((0, isFunction_1.isFunction)(options)) {
        resultSelector = options;
        options = undefined;
    }
    if (resultSelector) {
        return fromEvent(target, eventName, options).pipe((0, mapOneOrManyArgs_1.mapOneOrManyArgs)(resultSelector));
    }
    const [add, remove] = isEventTarget(target)
        ? eventTargetMethods.map((methodName) => (handler) => target[methodName](eventName, handler, options))
        :
            isNodeStyleEventEmitter(target)
                ? nodeEventEmitterMethods.map(toCommonHandlerRegistry(target, eventName))
                : isJQueryStyleEventEmitter(target)
                    ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName))
                    : [];
    if (!add) {
        if ((0, isArrayLike_1.isArrayLike)(target)) {
            return (0, mergeMap_1.mergeMap)((subTarget) => fromEvent(subTarget, eventName, options))((0, innerFrom_1.innerFrom)(target));
        }
    }
    if (!add) {
        throw new TypeError('Invalid event target');
    }
    return new Observable_1.Observable((subscriber) => {
        const handler = (...args) => subscriber.next(1 < args.length ? args : args[0]);
        add(handler);
        return () => remove(handler);
    });
}
exports.fromEvent = fromEvent;
function toCommonHandlerRegistry(target, eventName) {
    return (methodName) => (handler) => target[methodName](eventName, handler);
}
function isNodeStyleEventEmitter(target) {
    return (0, isFunction_1.isFunction)(target.addListener) && (0, isFunction_1.isFunction)(target.removeListener);
}
function isJQueryStyleEventEmitter(target) {
    return (0, isFunction_1.isFunction)(target.on) && (0, isFunction_1.isFunction)(target.off);
}
function isEventTarget(target) {
    return (0, isFunction_1.isFunction)(target.addEventListener) && (0, isFunction_1.isFunction)(target.removeEventListener);
}
//# sourceMappingURL=fromEvent.js.map