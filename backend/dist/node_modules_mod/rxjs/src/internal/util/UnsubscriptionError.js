"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnsubscriptionError = void 0;
const createErrorClass_1 = require("./createErrorClass");
exports.UnsubscriptionError = (0, createErrorClass_1.createErrorClass)((_super) => function UnsubscriptionErrorImpl(errors) {
    _super(this);
    this.message = errors
        ? `${errors.length} errors occurred during unsubscription:
${errors.map((err, i) => `${i + 1}) ${err.toString()}`).join('\n  ')}`
        : '';
    this.name = 'UnsubscriptionError';
    this.errors = errors;
});
//# sourceMappingURL=UnsubscriptionError.js.map