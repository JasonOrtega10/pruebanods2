"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindNodeCallback = void 0;
const bindCallbackInternals_1 = require("./bindCallbackInternals");
function bindNodeCallback(callbackFunc, resultSelector, scheduler) {
    return (0, bindCallbackInternals_1.bindCallbackInternals)(true, callbackFunc, resultSelector, scheduler);
}
exports.bindNodeCallback = bindNodeCallback;
//# sourceMappingURL=bindNodeCallback.js.map