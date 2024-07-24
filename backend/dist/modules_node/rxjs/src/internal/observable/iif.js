"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iif = void 0;
const defer_1 = require("./defer");
function iif(condition, trueResult, falseResult) {
    return (0, defer_1.defer)(() => (condition() ? trueResult : falseResult));
}
exports.iif = iif;
//# sourceMappingURL=iif.js.map