"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAbsoluteMappingEntries = void 0;
const path = require("path");
function getAbsoluteMappingEntries(absoluteBaseUrl, paths, addMatchAll) {
    const sortedKeys = sortByLongestPrefix(Object.keys(paths));
    const absolutePaths = [];
    for (const key of sortedKeys) {
        absolutePaths.push({
            pattern: key,
            paths: paths[key].map((pathToResolve) => path.resolve(absoluteBaseUrl, pathToResolve)),
        });
    }
    if (!paths["*"] && addMatchAll) {
        absolutePaths.push({
            pattern: "*",
            paths: [`${absoluteBaseUrl.replace(/\/$/, "")}/*`],
        });
    }
    return absolutePaths;
}
exports.getAbsoluteMappingEntries = getAbsoluteMappingEntries;
function sortByLongestPrefix(arr) {
    return arr
        .concat()
        .sort((a, b) => getPrefixLength(b) - getPrefixLength(a));
}
function getPrefixLength(pattern) {
    const prefixLength = pattern.indexOf("*");
    return pattern.substr(0, prefixLength).length;
}
//# sourceMappingURL=mapping-entry.js.map