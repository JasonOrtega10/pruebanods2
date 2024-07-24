"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.race = void 0;
const argsOrArgArray_1 = require("../util/argsOrArgArray");
const raceWith_1 = require("./raceWith");
function race(...args) {
    return (0, raceWith_1.raceWith)(...(0, argsOrArgArray_1.argsOrArgArray)(args));
}
exports.race = race;
//# sourceMappingURL=race.js.map