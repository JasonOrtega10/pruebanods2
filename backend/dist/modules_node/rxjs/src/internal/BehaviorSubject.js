"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BehaviorSubject = void 0;
const Subject_1 = require("./Subject");
class BehaviorSubject extends Subject_1.Subject {
    constructor(_value) {
        super();
        this._value = _value;
    }
    get value() {
        return this.getValue();
    }
    _subscribe(subscriber) {
        const subscription = super._subscribe(subscriber);
        !subscription.closed && subscriber.next(this._value);
        return subscription;
    }
    getValue() {
        const { hasError, thrownError, _value } = this;
        if (hasError) {
            throw thrownError;
        }
        this._throwIfClosed();
        return _value;
    }
    next(value) {
        super.next((this._value = value));
    }
}
exports.BehaviorSubject = BehaviorSubject;
//# sourceMappingURL=BehaviorSubject.js.map