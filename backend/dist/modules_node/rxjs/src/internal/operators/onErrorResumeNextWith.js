"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onErrorResumeNext = exports.onErrorResumeNextWith = void 0;
const argsOrArgArray_1 = require("../util/argsOrArgArray");
const onErrorResumeNext_1 = require("../observable/onErrorResumeNext");
function onErrorResumeNextWith(...sources) {
    const nextSources = (0, argsOrArgArray_1.argsOrArgArray)(sources);
    return (source) => (0, onErrorResumeNext_1.onErrorResumeNext)(source, ...nextSources);
}
exports.onErrorResumeNextWith = onErrorResumeNextWith;
exports.onErrorResumeNext = onErrorResumeNextWith;
//# sourceMappingURL=onErrorResumeNextWith.js.map