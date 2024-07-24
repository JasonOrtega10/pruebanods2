"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishReplay = void 0;
const ReplaySubject_1 = require("../ReplaySubject");
const multicast_1 = require("./multicast");
const isFunction_1 = require("../util/isFunction");
function publishReplay(bufferSize, windowTime, selectorOrScheduler, timestampProvider) {
    if (selectorOrScheduler && !(0, isFunction_1.isFunction)(selectorOrScheduler)) {
        timestampProvider = selectorOrScheduler;
    }
    const selector = (0, isFunction_1.isFunction)(selectorOrScheduler) ? selectorOrScheduler : undefined;
    return (source) => (0, multicast_1.multicast)(new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, timestampProvider), selector)(source);
}
exports.publishReplay = publishReplay;
//# sourceMappingURL=publishReplay.js.map