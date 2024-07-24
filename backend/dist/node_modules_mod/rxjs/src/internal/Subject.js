"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnonymousSubject = exports.Subject = void 0;
const Observable_1 = require("./Observable");
const Subscription_1 = require("./Subscription");
const ObjectUnsubscribedError_1 = require("./util/ObjectUnsubscribedError");
const arrRemove_1 = require("./util/arrRemove");
const errorContext_1 = require("./util/errorContext");
class Subject extends Observable_1.Observable {
    constructor() {
        super();
        this.closed = false;
        this.currentObservers = null;
        this.observers = [];
        this.isStopped = false;
        this.hasError = false;
        this.thrownError = null;
    }
    lift(operator) {
        const subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    }
    _throwIfClosed() {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
    }
    next(value) {
        (0, errorContext_1.errorContext)(() => {
            this._throwIfClosed();
            if (!this.isStopped) {
                if (!this.currentObservers) {
                    this.currentObservers = Array.from(this.observers);
                }
                for (const observer of this.currentObservers) {
                    observer.next(value);
                }
            }
        });
    }
    error(err) {
        (0, errorContext_1.errorContext)(() => {
            this._throwIfClosed();
            if (!this.isStopped) {
                this.hasError = this.isStopped = true;
                this.thrownError = err;
                const { observers } = this;
                while (observers.length) {
                    observers.shift().error(err);
                }
            }
        });
    }
    complete() {
        (0, errorContext_1.errorContext)(() => {
            this._throwIfClosed();
            if (!this.isStopped) {
                this.isStopped = true;
                const { observers } = this;
                while (observers.length) {
                    observers.shift().complete();
                }
            }
        });
    }
    unsubscribe() {
        this.isStopped = this.closed = true;
        this.observers = this.currentObservers = null;
    }
    get observed() {
        var _a;
        return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
    }
    _trySubscribe(subscriber) {
        this._throwIfClosed();
        return super._trySubscribe(subscriber);
    }
    _subscribe(subscriber) {
        this._throwIfClosed();
        this._checkFinalizedStatuses(subscriber);
        return this._innerSubscribe(subscriber);
    }
    _innerSubscribe(subscriber) {
        const { hasError, isStopped, observers } = this;
        if (hasError || isStopped) {
            return Subscription_1.EMPTY_SUBSCRIPTION;
        }
        this.currentObservers = null;
        observers.push(subscriber);
        return new Subscription_1.Subscription(() => {
            this.currentObservers = null;
            (0, arrRemove_1.arrRemove)(observers, subscriber);
        });
    }
    _checkFinalizedStatuses(subscriber) {
        const { hasError, thrownError, isStopped } = this;
        if (hasError) {
            subscriber.error(thrownError);
        }
        else if (isStopped) {
            subscriber.complete();
        }
    }
    asObservable() {
        const observable = new Observable_1.Observable();
        observable.source = this;
        return observable;
    }
}
exports.Subject = Subject;
Subject.create = (destination, source) => {
    return new AnonymousSubject(destination, source);
};
class AnonymousSubject extends Subject {
    constructor(destination, source) {
        super();
        this.destination = destination;
        this.source = source;
    }
    next(value) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    }
    error(err) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
    }
    complete() {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    _subscribe(subscriber) {
        var _a, _b;
        return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : Subscription_1.EMPTY_SUBSCRIPTION;
    }
}
exports.AnonymousSubject = AnonymousSubject;
//# sourceMappingURL=Subject.js.map