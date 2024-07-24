"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.using = void 0;
const Observable_1 = require("../Observable");
const innerFrom_1 = require("./innerFrom");
const empty_1 = require("./empty");
function using(resourceFactory, observableFactory) {
    return new Observable_1.Observable((subscriber) => {
        const resource = resourceFactory();
        const result = observableFactory(resource);
        const source = result ? (0, innerFrom_1.innerFrom)(result) : empty_1.EMPTY;
        source.subscribe(subscriber);
        return () => {
            if (resource) {
                resource.unsubscribe();
            }
        };
    });
}
exports.using = using;
//# sourceMappingURL=using.js.map