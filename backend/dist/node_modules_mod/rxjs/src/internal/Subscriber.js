"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMPTY_OBSERVER = exports.SafeSubscriber = exports.Subscriber = void 0;
const isFunction_1 = require("./util/isFunction");
const Subscription_1 = require("./Subscription");
const config_1 = require("./config");
const reportUnhandledError_1 = require("./util/reportUnhandledError");
const noop_1 = require("./util/noop");
const NotificationFactories_1 = require("./NotificationFactories");
const timeoutProvider_1 = require("./scheduler/timeoutProvider");
const errorContext_1 = require("./util/errorContext");
class Subscriber extends Subscription_1.Subscription {
    static create(next, error, complete) {
        return new SafeSubscriber(next, error, complete);
    }
    constructor(destination) {
        super();
        this.isStopped = false;
        if (destination) {
            this.destination = destination;
            if ((0, Subscription_1.isSubscription)(destination)) {
                destination.add(this);
            }
        }
        else {
            this.destination = exports.EMPTY_OBSERVER;
        }
    }
    next(value) {
        if (this.isStopped) {
            handleStoppedNotification((0, NotificationFactories_1.nextNotification)(value), this);
        }
        else {
            this._next(value);
        }
    }
    error(err) {
        if (this.isStopped) {
            handleStoppedNotification((0, NotificationFactories_1.errorNotification)(err), this);
        }
        else {
            this.isStopped = true;
            this._error(err);
        }
    }
    complete() {
        if (this.isStopped) {
            handleStoppedNotification(NotificationFactories_1.COMPLETE_NOTIFICATION, this);
        }
        else {
            this.isStopped = true;
            this._complete();
        }
    }
    unsubscribe() {
        if (!this.closed) {
            this.isStopped = true;
            super.unsubscribe();
            this.destination = null;
        }
    }
    _next(value) {
        this.destination.next(value);
    }
    _error(err) {
        try {
            this.destination.error(err);
        }
        finally {
            this.unsubscribe();
        }
    }
    _complete() {
        try {
            this.destination.complete();
        }
        finally {
            this.unsubscribe();
        }
    }
}
exports.Subscriber = Subscriber;
const _bind = Function.prototype.bind;
function bind(fn, thisArg) {
    return _bind.call(fn, thisArg);
}
class ConsumerObserver {
    constructor(partialObserver) {
        this.partialObserver = partialObserver;
    }
    next(value) {
        const { partialObserver } = this;
        if (partialObserver.next) {
            try {
                partialObserver.next(value);
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
    }
    error(err) {
        const { partialObserver } = this;
        if (partialObserver.error) {
            try {
                partialObserver.error(err);
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
        else {
            handleUnhandledError(err);
        }
    }
    complete() {
        const { partialObserver } = this;
        if (partialObserver.complete) {
            try {
                partialObserver.complete();
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
    }
}
class SafeSubscriber extends Subscriber {
    constructor(observerOrNext, error, complete) {
        super();
        let partialObserver;
        if ((0, isFunction_1.isFunction)(observerOrNext) || !observerOrNext) {
            partialObserver = {
                next: (observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : undefined),
                error: error !== null && error !== void 0 ? error : undefined,
                complete: complete !== null && complete !== void 0 ? complete : undefined,
            };
        }
        else {
            let context;
            if (this && config_1.config.useDeprecatedNextContext) {
                context = Object.create(observerOrNext);
                context.unsubscribe = () => this.unsubscribe();
                partialObserver = {
                    next: observerOrNext.next && bind(observerOrNext.next, context),
                    error: observerOrNext.error && bind(observerOrNext.error, context),
                    complete: observerOrNext.complete && bind(observerOrNext.complete, context),
                };
            }
            else {
                partialObserver = observerOrNext;
            }
        }
        this.destination = new ConsumerObserver(partialObserver);
    }
}
exports.SafeSubscriber = SafeSubscriber;
function handleUnhandledError(error) {
    if (config_1.config.useDeprecatedSynchronousErrorHandling) {
        (0, errorContext_1.captureError)(error);
    }
    else {
        (0, reportUnhandledError_1.reportUnhandledError)(error);
    }
}
function defaultErrorHandler(err) {
    throw err;
}
function handleStoppedNotification(notification, subscriber) {
    const { onStoppedNotification } = config_1.config;
    onStoppedNotification && timeoutProvider_1.timeoutProvider.setTimeout(() => onStoppedNotification(notification, subscriber));
}
exports.EMPTY_OBSERVER = {
    closed: true,
    next: noop_1.noop,
    error: defaultErrorHandler,
    complete: noop_1.noop,
};
//# sourceMappingURL=Subscriber.js.map