"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.empty = exports.EMPTY = void 0;
const Observable_1 = require("../Observable");
exports.EMPTY = new Observable_1.Observable((subscriber) => subscriber.complete());
function empty(scheduler) {
    return scheduler ? emptyScheduled(scheduler) : exports.EMPTY;
}
exports.empty = empty;
function emptyScheduled(scheduler) {
    return new Observable_1.Observable((subscriber) => scheduler.schedule(() => subscriber.complete()));
}
//# sourceMappingURL=empty.js.map