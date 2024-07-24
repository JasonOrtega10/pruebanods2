"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectUnsubscribedError = void 0;
const createErrorClass_1 = require("./createErrorClass");
exports.ObjectUnsubscribedError = (0, createErrorClass_1.createErrorClass)((_super) => function ObjectUnsubscribedErrorImpl() {
    _super(this);
    this.name = 'ObjectUnsubscribedError';
    this.message = 'object unsubscribed';
});
//# sourceMappingURL=ObjectUnsubscribedError.js.map