"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defer = void 0;
const Observable_1 = require("../Observable");
const innerFrom_1 = require("./innerFrom");
function defer(observableFactory) {
    return new Observable_1.Observable((subscriber) => {
        (0, innerFrom_1.innerFrom)(observableFactory()).subscribe(subscriber);
    });
}
exports.defer = defer;
//# sourceMappingURL=defer.js.map