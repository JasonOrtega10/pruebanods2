"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ucs2length(str) {
    const len = str.length;
    let length = 0;
    let pos = 0;
    let value;
    while (pos < len) {
        length++;
        value = str.charCodeAt(pos++);
        if (value >= 0xd800 && value <= 0xdbff && pos < len) {
            value = str.charCodeAt(pos);
            if ((value & 0xfc00) === 0xdc00)
                pos++;
        }
    }
    return length;
}
exports.default = ucs2length;
ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';
//# sourceMappingURL=ucs2length.js.map