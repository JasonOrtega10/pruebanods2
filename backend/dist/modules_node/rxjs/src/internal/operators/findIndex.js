"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findIndex = void 0;
const lift_1 = require("../util/lift");
const find_1 = require("./find");
function findIndex(predicate, thisArg) {
    return (0, lift_1.operate)((0, find_1.createFind)(predicate, thisArg, 'index'));
}
exports.findIndex = findIndex;
//# sourceMappingURL=findIndex.js.map