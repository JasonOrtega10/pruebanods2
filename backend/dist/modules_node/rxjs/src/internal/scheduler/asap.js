"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asap = exports.asapScheduler = void 0;
const AsapAction_1 = require("./AsapAction");
const AsapScheduler_1 = require("./AsapScheduler");
exports.asapScheduler = new AsapScheduler_1.AsapScheduler(AsapAction_1.AsapAction);
exports.asap = exports.asapScheduler;
//# sourceMappingURL=asap.js.map