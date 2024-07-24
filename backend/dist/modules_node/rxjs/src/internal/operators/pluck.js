"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluck = void 0;
const map_1 = require("./map");
function pluck(...properties) {
    const length = properties.length;
    if (length === 0) {
        throw new Error('list of properties cannot be empty.');
    }
    return (0, map_1.map)((x) => {
        let currentProp = x;
        for (let i = 0; i < length; i++) {
            const p = currentProp === null || currentProp === void 0 ? void 0 : currentProp[properties[i]];
            if (typeof p !== 'undefined') {
                currentProp = p;
            }
            else {
                return undefined;
            }
        }
        return currentProp;
    });
}
exports.pluck = pluck;
//# sourceMappingURL=pluck.js.map