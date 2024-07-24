"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequenceError = void 0;
const createErrorClass_1 = require("./createErrorClass");
exports.SequenceError = (0, createErrorClass_1.createErrorClass)((_super) => function SequenceErrorImpl(message) {
    _super(this);
    this.name = 'SequenceError';
    this.message = message;
});
//# sourceMappingURL=SequenceError.js.map