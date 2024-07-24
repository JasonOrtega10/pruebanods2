"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endWith = void 0;
const concat_1 = require("../observable/concat");
const of_1 = require("../observable/of");
function endWith(...values) {
    return (source) => (0, concat_1.concat)(source, (0, of_1.of)(...values));
}
exports.endWith = endWith;
//# sourceMappingURL=endWith.js.map