"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intervalProvider = void 0;
exports.intervalProvider = {
    setInterval(handler, timeout, ...args) {
        const { delegate } = exports.intervalProvider;
        if (delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) {
            return delegate.setInterval(handler, timeout, ...args);
        }
        return setInterval(handler, timeout, ...args);
    },
    clearInterval(handle) {
        const { delegate } = exports.intervalProvider;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
    },
    delegate: undefined,
};
//# sourceMappingURL=intervalProvider.js.map