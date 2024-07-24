"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animationFrameProvider = void 0;
const Subscription_1 = require("../Subscription");
exports.animationFrameProvider = {
    schedule(callback) {
        let request = requestAnimationFrame;
        let cancel = cancelAnimationFrame;
        const { delegate } = exports.animationFrameProvider;
        if (delegate) {
            request = delegate.requestAnimationFrame;
            cancel = delegate.cancelAnimationFrame;
        }
        const handle = request((timestamp) => {
            cancel = undefined;
            callback(timestamp);
        });
        return new Subscription_1.Subscription(() => cancel === null || cancel === void 0 ? void 0 : cancel(handle));
    },
    requestAnimationFrame(...args) {
        const { delegate } = exports.animationFrameProvider;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.requestAnimationFrame) || requestAnimationFrame)(...args);
    },
    cancelAnimationFrame(...args) {
        const { delegate } = exports.animationFrameProvider;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.cancelAnimationFrame) || cancelAnimationFrame)(...args);
    },
    delegate: undefined,
};
//# sourceMappingURL=animationFrameProvider.js.map