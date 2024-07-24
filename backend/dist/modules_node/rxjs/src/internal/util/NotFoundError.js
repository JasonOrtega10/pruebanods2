"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const createErrorClass_1 = require("./createErrorClass");
exports.NotFoundError = (0, createErrorClass_1.createErrorClass)((_super) => function NotFoundErrorImpl(message) {
    _super(this);
    this.name = 'NotFoundError';
    this.message = message;
});
//# sourceMappingURL=NotFoundError.js.map