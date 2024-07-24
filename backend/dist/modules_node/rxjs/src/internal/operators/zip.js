"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zip = void 0;
const zip_1 = require("../observable/zip");
const lift_1 = require("../util/lift");
function zip(...sources) {
    return (0, lift_1.operate)((source, subscriber) => {
        (0, zip_1.zip)(source, ...sources).subscribe(subscriber);
    });
}
exports.zip = zip;
//# sourceMappingURL=zip.js.map