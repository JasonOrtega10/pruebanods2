"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timer = void 0;
const Observable_1 = require("../Observable");
const async_1 = require("../scheduler/async");
const isScheduler_1 = require("../util/isScheduler");
const isDate_1 = require("../util/isDate");
function timer(dueTime = 0, intervalOrScheduler, scheduler = async_1.async) {
    let intervalDuration = -1;
    if (intervalOrScheduler != null) {
        if ((0, isScheduler_1.isScheduler)(intervalOrScheduler)) {
            scheduler = intervalOrScheduler;
        }
        else {
            intervalDuration = intervalOrScheduler;
        }
    }
    return new Observable_1.Observable((subscriber) => {
        let due = (0, isDate_1.isValidDate)(dueTime) ? +dueTime - scheduler.now() : dueTime;
        if (due < 0) {
            due = 0;
        }
        let n = 0;
        return scheduler.schedule(function () {
            if (!subscriber.closed) {
                subscriber.next(n++);
                if (0 <= intervalDuration) {
                    this.schedule(undefined, intervalDuration);
                }
                else {
                    subscriber.complete();
                }
            }
        }, due);
    });
}
exports.timer = timer;
//# sourceMappingURL=timer.js.map