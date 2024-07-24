"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueAction = void 0;
const AsyncAction_1 = require("./AsyncAction");
class QueueAction extends AsyncAction_1.AsyncAction {
    constructor(scheduler, work) {
        super(scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
    }
    schedule(state, delay = 0) {
        if (delay > 0) {
            return super.schedule(state, delay);
        }
        this.delay = delay;
        this.state = state;
        this.scheduler.flush(this);
        return this;
    }
    execute(state, delay) {
        return delay > 0 || this.closed ? super.execute(state, delay) : this._execute(state, delay);
    }
    requestAsyncId(scheduler, id, delay = 0) {
        if ((delay != null && delay > 0) || (delay == null && this.delay > 0)) {
            return super.requestAsyncId(scheduler, id, delay);
        }
        scheduler.flush(this);
        return 0;
    }
}
exports.QueueAction = QueueAction;
//# sourceMappingURL=QueueAction.js.map