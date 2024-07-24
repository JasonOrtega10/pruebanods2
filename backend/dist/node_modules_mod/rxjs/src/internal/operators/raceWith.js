"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.raceWith = void 0;
const race_1 = require("../observable/race");
const lift_1 = require("../util/lift");
const identity_1 = require("../util/identity");
function raceWith(...otherSources) {
    return !otherSources.length
        ? identity_1.identity
        : (0, lift_1.operate)((source, subscriber) => {
            (0, race_1.raceInit)([source, ...otherSources])(subscriber);
        });
}
exports.raceWith = raceWith;
//# sourceMappingURL=raceWith.js.map