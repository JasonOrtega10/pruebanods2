"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentOutOfRangeError = void 0;
const createErrorClass_1 = require("./createErrorClass");
exports.ArgumentOutOfRangeError = (0, createErrorClass_1.createErrorClass)((_super) => function ArgumentOutOfRangeErrorImpl() {
    _super(this);
    this.name = 'ArgumentOutOfRangeError';
    this.message = 'argument out of range';
});
//# sourceMappingURL=ArgumentOutOfRangeError.js.map