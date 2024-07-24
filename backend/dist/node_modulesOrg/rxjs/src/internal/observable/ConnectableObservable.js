"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectableObservable = void 0;
const Observable_1 = require("../Observable");
const Subscription_1 = require("../Subscription");
const refCount_1 = require("../operators/refCount");
const OperatorSubscriber_1 = require("../operators/OperatorSubscriber");
const lift_1 = require("../util/lift");
class ConnectableObservable extends Observable_1.Observable {
    constructor(source, subjectFactory) {
        super();
        this.source = source;
        this.subjectFactory = subjectFactory;
        this._subject = null;
        this._refCount = 0;
        this._connection = null;
        if ((0, lift_1.hasLift)(source)) {
            this.lift = source.lift;
        }
    }
    _subscribe(subscriber) {
        return this.getSubject().subscribe(subscriber);
    }
    getSubject() {
        const subject = this._subject;
        if (!subject || subject.isStopped) {
            this._subject = this.subjectFactory();
        }
        return this._subject;
    }
    _teardown() {
        this._refCount = 0;
        const { _connection } = this;
        this._subject = this._connection = null;
        _connection === null || _connection === void 0 ? void 0 : _connection.unsubscribe();
    }
    connect() {
        let connection = this._connection;
        if (!connection) {
            connection = this._connection = new Subscription_1.Subscription();
            const subject = this.getSubject();
            connection.add(this.source.subscribe((0, OperatorSubscriber_1.createOperatorSubscriber)(subject, undefined, () => {
                this._teardown();
                subject.complete();
            }, (err) => {
                this._teardown();
                subject.error(err);
            }, () => this._teardown())));
            if (connection.closed) {
                this._connection = null;
                connection = Subscription_1.Subscription.EMPTY;
            }
        }
        return connection;
    }
    refCount() {
        return (0, refCount_1.refCount)()(this);
    }
}
exports.ConnectableObservable = ConnectableObservable;
//# sourceMappingURL=ConnectableObservable.js.map