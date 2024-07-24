"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startWith = void 0;
const concat_1 = require("../observable/concat");
const args_1 = require("../util/args");
const lift_1 = require("../util/lift");
function startWith(...values) {
    const scheduler = (0, args_1.popScheduler)(values);
    return (0, lift_1.operate)((source, subscriber) => {
        (scheduler ? (0, concat_1.concat)(values, source, scheduler) : (0, concat_1.concat)(values, source)).subscribe(subscriber);
    });
}
exports.startWith = startWith;
//# sourceMappingURL=startWith.js.map