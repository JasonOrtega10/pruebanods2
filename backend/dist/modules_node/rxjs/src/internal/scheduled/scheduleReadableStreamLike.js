"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleReadableStreamLike = void 0;
const scheduleAsyncIterable_1 = require("./scheduleAsyncIterable");
const isReadableStreamLike_1 = require("../util/isReadableStreamLike");
function scheduleReadableStreamLike(input, scheduler) {
    return (0, scheduleAsyncIterable_1.scheduleAsyncIterable)((0, isReadableStreamLike_1.readableStreamLikeToAsyncGenerator)(input), scheduler);
}
exports.scheduleReadableStreamLike = scheduleReadableStreamLike;
//# sourceMappingURL=scheduleReadableStreamLike.js.map