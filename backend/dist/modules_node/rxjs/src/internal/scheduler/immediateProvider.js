"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.immediateProvider = void 0;
const Immediate_1 = require("../util/Immediate");
const { setImmediate, clearImmediate } = Immediate_1.Immediate;
exports.immediateProvider = {
    setImmediate(...args) {
        const { delegate } = exports.immediateProvider;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.setImmediate) || setImmediate)(...args);
    },
    clearImmediate(handle) {
        const { delegate } = exports.immediateProvider;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearImmediate) || clearImmediate)(handle);
    },
    delegate: undefined,
};
//# sourceMappingURL=immediateProvider.js.map