"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toArray = void 0;
const reduce_1 = require("./reduce");
const lift_1 = require("../util/lift");
const arrReducer = (arr, value) => (arr.push(value), arr);
function toArray() {
    return (0, lift_1.operate)((source, subscriber) => {
        (0, reduce_1.reduce)(arrReducer, [])(source).subscribe(subscriber);
    });
}
exports.toArray = toArray;
//# sourceMappingURL=toArray.js.map