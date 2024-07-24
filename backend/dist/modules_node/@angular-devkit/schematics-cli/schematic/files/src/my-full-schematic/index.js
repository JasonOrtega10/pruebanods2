"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
function default_1(options) {
    return (0, schematics_1.chain)([
        (_tree, context) => {
            context.logger.info('My Full Schematic: ' + JSON.stringify(options));
        },
        (0, schematics_1.schematic)('my-other-schematic', { option: true }),
        (0, schematics_1.mergeWith)((0, schematics_1.apply)((0, schematics_1.url)('./files'), [
            (0, schematics_1.template)({
                INDEX: options.index,
                name: options.name,
            }),
        ])),
    ]);
}
exports.default = default_1;
//# sourceMappingURL=index.js.map