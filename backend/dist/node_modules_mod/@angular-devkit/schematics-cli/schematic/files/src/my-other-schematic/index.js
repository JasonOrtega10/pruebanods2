"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
function default_1(options) {
    return (0, schematics_1.chain)([
        (tree, context) => {
            context.logger.info('My Other Schematic: ' + JSON.stringify(options));
            tree.create('hola', 'mundo');
        },
        (0, schematics_1.schematic)('my-schematic', { option: true }),
        (tree) => {
            tree.rename('hello', 'allo');
        },
    ]);
}
exports.default = default_1;
//# sourceMappingURL=index.js.map