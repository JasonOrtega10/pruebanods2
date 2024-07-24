"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindCallback = void 0;
const bindCallbackInternals_1 = require("./bindCallbackInternals");
function bindCallback(callbackFunc, resultSelector, scheduler) {
    return (0, bindCallbackInternals_1.bindCallbackInternals)(false, callbackFunc, resultSelector, scheduler);
}
exports.bindCallback = bindCallback;
//# sourceMappingURL=bindCallback.js.map