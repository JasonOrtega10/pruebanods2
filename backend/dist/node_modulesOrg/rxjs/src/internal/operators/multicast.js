"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multicast = void 0;
const ConnectableObservable_1 = require("../observable/ConnectableObservable");
const isFunction_1 = require("../util/isFunction");
const connect_1 = require("./connect");
function multicast(subjectOrSubjectFactory, selector) {
    const subjectFactory = (0, isFunction_1.isFunction)(subjectOrSubjectFactory) ? subjectOrSubjectFactory : () => subjectOrSubjectFactory;
    if ((0, isFunction_1.isFunction)(selector)) {
        return (0, connect_1.connect)(selector, {
            connector: subjectFactory,
        });
    }
    return (source) => new ConnectableObservable_1.ConnectableObservable(source, subjectFactory);
}
exports.multicast = multicast;
//# sourceMappingURL=multicast.js.map