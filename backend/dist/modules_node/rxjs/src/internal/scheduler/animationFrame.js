"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animationFrame = exports.animationFrameScheduler = void 0;
const AnimationFrameAction_1 = require("./AnimationFrameAction");
const AnimationFrameScheduler_1 = require("./AnimationFrameScheduler");
exports.animationFrameScheduler = new AnimationFrameScheduler_1.AnimationFrameScheduler(AnimationFrameAction_1.AnimationFrameAction);
exports.animationFrame = exports.animationFrameScheduler;
//# sourceMappingURL=animationFrame.js.map