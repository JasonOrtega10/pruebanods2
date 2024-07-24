"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mySchematic = void 0;
function mySchematic(options) {
    return (tree, context) => {
        context.logger.info('My Schematic: ' + JSON.stringify(options));
        tree.create('hello', 'world');
        return tree;
    };
}
exports.mySchematic = mySchematic;
//# sourceMappingURL=index.js.map