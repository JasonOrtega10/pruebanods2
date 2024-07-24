"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeoutWith = void 0;
const async_1 = require("../scheduler/async");
const isDate_1 = require("../util/isDate");
const timeout_1 = require("./timeout");
function timeoutWith(due, withObservable, scheduler) {
    let first;
    let each;
    let _with;
    scheduler = scheduler !== null && scheduler !== void 0 ? scheduler : async_1.async;
    if ((0, isDate_1.isValidDate)(due)) {
        first = due;
    }
    else if (typeof due === 'number') {
        each = due;
    }
    if (withObservable) {
        _with = () => withObservable;
    }
    else {
        throw new TypeError('No observable provided to switch to');
    }
    if (first == null && each == null) {
        throw new TypeError('No timeout provided.');
    }
    return (0, timeout_1.timeout)({
        first,
        each,
        scheduler,
        with: _with,
    });
}
exports.timeoutWith = timeoutWith;
//# sourceMappingURL=timeoutWith.js.map