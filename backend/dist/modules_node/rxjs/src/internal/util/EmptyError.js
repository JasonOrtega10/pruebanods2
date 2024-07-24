"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyError = void 0;
const createErrorClass_1 = require("./createErrorClass");
exports.EmptyError = (0, createErrorClass_1.createErrorClass)((_super) => function EmptyErrorImpl() {
    _super(this);
    this.name = 'EmptyError';
    this.message = 'no elements in sequence';
});
//# sourceMappingURL=EmptyError.js.map