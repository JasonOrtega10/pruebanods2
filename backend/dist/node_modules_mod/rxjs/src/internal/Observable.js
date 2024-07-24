"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Observable = void 0;
const Subscriber_1 = require("./Subscriber");
const Subscription_1 = require("./Subscription");
const observable_1 = require("./symbol/observable");
const pipe_1 = require("./util/pipe");
const config_1 = require("./config");
const isFunction_1 = require("./util/isFunction");
const errorContext_1 = require("./util/errorContext");
class Observable {
    constructor(subscribe) {
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    lift(operator) {
        const observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    }
    subscribe(observerOrNext, error, complete) {
        const subscriber = isSubscriber(observerOrNext) ? observerOrNext : new Subscriber_1.SafeSubscriber(observerOrNext, error, complete);
        (0, errorContext_1.errorContext)(() => {
            const { operator, source } = this;
            subscriber.add(operator
                ?
                    operator.call(subscriber, source)
                : source
                    ?
                        this._subscribe(subscriber)
                    :
                        this._trySubscribe(subscriber));
        });
        return subscriber;
    }
    _trySubscribe(sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.error(err);
        }
    }
    forEach(next, promiseCtor) {
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor((resolve, reject) => {
            const subscriber = new Subscriber_1.SafeSubscriber({
                next: (value) => {
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscriber.unsubscribe();
                    }
                },
                error: reject,
                complete: resolve,
            });
            this.subscribe(subscriber);
        });
    }
    _subscribe(subscriber) {
        var _a;
        return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    }
    [observable_1.observable]() {
        return this;
    }
    pipe(...operations) {
        return (0, pipe_1.pipeFromArray)(operations)(this);
    }
    toPromise(promiseCtor) {
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor((resolve, reject) => {
            let value;
            this.subscribe((x) => (value = x), (err) => reject(err), () => resolve(value));
        });
    }
}
exports.Observable = Observable;
Observable.create = (subscribe) => {
    return new Observable(subscribe);
};
function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config_1.config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
    return value && (0, isFunction_1.isFunction)(value.next) && (0, isFunction_1.isFunction)(value.error) && (0, isFunction_1.isFunction)(value.complete);
}
function isSubscriber(value) {
    return (value && value instanceof Subscriber_1.Subscriber) || (isObserver(value) && (0, Subscription_1.isSubscription)(value));
}
//# sourceMappingURL=Observable.js.map