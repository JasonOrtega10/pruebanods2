"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publish = void 0;
const Subject_1 = require("../Subject");
const multicast_1 = require("./multicast");
const connect_1 = require("./connect");
function publish(selector) {
    return selector ? (source) => (0, connect_1.connect)(selector)(source) : (source) => (0, multicast_1.multicast)(new Subject_1.Subject())(source);
}
exports.publish = publish;
//# sourceMappingURL=publish.js.map