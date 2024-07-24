"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concatWith = void 0;
const concat_1 = require("./concat");
function concatWith(...otherSources) {
    return (0, concat_1.concat)(...otherSources);
}
exports.concatWith = concatWith;
//# sourceMappingURL=concatWith.js.map