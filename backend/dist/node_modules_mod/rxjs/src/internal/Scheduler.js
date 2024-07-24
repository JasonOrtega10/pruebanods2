"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scheduler = void 0;
const dateTimestampProvider_1 = require("./scheduler/dateTimestampProvider");
class Scheduler {
    constructor(schedulerActionCtor, now = Scheduler.now) {
        this.schedulerActionCtor = schedulerActionCtor;
        this.now = now;
    }
    schedule(work, delay = 0, state) {
        return new this.schedulerActionCtor(this, work).schedule(state, delay);
    }
}
exports.Scheduler = Scheduler;
Scheduler.now = dateTimestampProvider_1.dateTimestampProvider.now;
//# sourceMappingURL=Scheduler.js.map