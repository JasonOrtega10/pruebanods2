"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineLatestWith = void 0;
const combineLatest_1 = require("./combineLatest");
function combineLatestWith(...otherSources) {
    return (0, combineLatest_1.combineLatest)(...otherSources);
}
exports.combineLatestWith = combineLatestWith;
//# sourceMappingURL=combineLatestWith.js.map