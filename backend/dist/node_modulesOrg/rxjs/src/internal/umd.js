"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetch = exports.webSocket = exports.ajax = exports.testing = exports.operators = void 0;
__exportStar(require("../index"), exports);
const _operators = require("../operators/index");
exports.operators = _operators;
const _testing = require("../testing/index");
exports.testing = _testing;
const _ajax = require("../ajax/index");
exports.ajax = _ajax;
const _webSocket = require("../webSocket/index");
exports.webSocket = _webSocket;
const _fetch = require("../fetch/index");
exports.fetch = _fetch;
//# sourceMappingURL=umd.js.map