"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncScheduler = void 0;
const Scheduler_1 = require("../Scheduler");
class AsyncScheduler extends Scheduler_1.Scheduler {
    constructor(SchedulerAction, now = Scheduler_1.Scheduler.now) {
        super(SchedulerAction, now);
        this.actions = [];
        this._active = false;
    }
    flush(action) {
        const { actions } = this;
        if (this._active) {
            actions.push(action);
            return;
        }
        let error;
        this._active = true;
        do {
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        } while ((action = actions.shift()));
        this._active = false;
        if (error) {
            while ((action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    }
}
exports.AsyncScheduler = AsyncScheduler;
//# sourceMappingURL=AsyncScheduler.js.map