"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const Subject_1 = require("../Subject");
const innerFrom_1 = require("../observable/innerFrom");
const lift_1 = require("../util/lift");
const fromSubscribable_1 = require("../observable/fromSubscribable");
const DEFAULT_CONFIG = {
    connector: () => new Subject_1.Subject(),
};
function connect(selector, config = DEFAULT_CONFIG) {
    const { connector } = config;
    return (0, lift_1.operate)((source, subscriber) => {
        const subject = connector();
        (0, innerFrom_1.innerFrom)(selector((0, fromSubscribable_1.fromSubscribable)(subject))).subscribe(subscriber);
        subscriber.add(source.subscribe(subject));
    });
}
exports.connect = connect;
//# sourceMappingURL=connect.js.map