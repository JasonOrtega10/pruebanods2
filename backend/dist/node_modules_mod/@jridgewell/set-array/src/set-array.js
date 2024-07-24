"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetArray = exports.pop = exports.put = exports.get = void 0;
class SetArray {
    constructor() {
        this._indexes = { __proto__: null };
        this.array = [];
    }
}
exports.SetArray = SetArray;
(() => {
    exports.get = (strarr, key) => strarr._indexes[key];
    exports.put = (strarr, key) => {
        const index = (0, exports.get)(strarr, key);
        if (index !== undefined)
            return index;
        const { array, _indexes: indexes } = strarr;
        return (indexes[key] = array.push(key) - 1);
    };
    exports.pop = (strarr) => {
        const { array, _indexes: indexes } = strarr;
        if (array.length === 0)
            return;
        const last = array.pop();
        indexes[last] = undefined;
    };
})();
//# sourceMappingURL=set-array.js.map