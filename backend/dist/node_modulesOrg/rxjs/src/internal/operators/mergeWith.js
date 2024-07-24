"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeWith = void 0;
const merge_1 = require("./merge");
function mergeWith(...otherSources) {
    return (0, merge_1.merge)(...otherSources);
}
exports.mergeWith = mergeWith;
//# sourceMappingURL=mergeWith.js.map