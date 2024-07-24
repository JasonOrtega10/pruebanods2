"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shareReplay = void 0;
const ReplaySubject_1 = require("../ReplaySubject");
const share_1 = require("./share");
function shareReplay(configOrBufferSize, windowTime, scheduler) {
    let bufferSize;
    let refCount = false;
    if (configOrBufferSize && typeof configOrBufferSize === 'object') {
        ({ bufferSize = Infinity, windowTime = Infinity, refCount = false, scheduler } = configOrBufferSize);
    }
    else {
        bufferSize = (configOrBufferSize !== null && configOrBufferSize !== void 0 ? configOrBufferSize : Infinity);
    }
    return (0, share_1.share)({
        connector: () => new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, scheduler),
        resetOnError: true,
        resetOnComplete: false,
        resetOnRefCountZero: refCount,
    });
}
exports.shareReplay = shareReplay;
//# sourceMappingURL=shareReplay.js.map