"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishLast = void 0;
const AsyncSubject_1 = require("../AsyncSubject");
const ConnectableObservable_1 = require("../observable/ConnectableObservable");
function publishLast() {
    return (source) => {
        const subject = new AsyncSubject_1.AsyncSubject();
        return new ConnectableObservable_1.ConnectableObservable(source, () => subject);
    };
}
exports.publishLast = publishLast;
//# sourceMappingURL=publishLast.js.map