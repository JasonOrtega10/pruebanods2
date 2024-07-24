"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.finalize = void 0;
const lift_1 = require("../util/lift");
function finalize(callback) {
    return (0, lift_1.operate)((source, subscriber) => {
        try {
            source.subscribe(subscriber);
        }
        finally {
            subscriber.add(callback);
        }
    });
}
exports.finalize = finalize;
//# sourceMappingURL=finalize.js.map