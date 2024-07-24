"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishBehavior = void 0;
const BehaviorSubject_1 = require("../BehaviorSubject");
const ConnectableObservable_1 = require("../observable/ConnectableObservable");
function publishBehavior(initialValue) {
    return (source) => {
        const subject = new BehaviorSubject_1.BehaviorSubject(initialValue);
        return new ConnectableObservable_1.ConnectableObservable(source, () => subject);
    };
}
exports.publishBehavior = publishBehavior;
//# sourceMappingURL=publishBehavior.js.map