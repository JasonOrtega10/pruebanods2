"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exhaustiveTypeException = exports.getStrippedPath = exports.getPathsToTry = void 0;
const path = require("path");
const path_1 = require("path");
const filesystem_1 = require("./filesystem");
function getPathsToTry(extensions, absolutePathMappings, requestedModule) {
    if (!absolutePathMappings || !requestedModule || requestedModule[0] === ".") {
        return undefined;
    }
    const pathsToTry = [];
    for (const entry of absolutePathMappings) {
        const starMatch = entry.pattern === requestedModule
            ? ""
            : matchStar(entry.pattern, requestedModule);
        if (starMatch !== undefined) {
            for (const physicalPathPattern of entry.paths) {
                const physicalPath = physicalPathPattern.replace("*", starMatch);
                pathsToTry.push({ type: "file", path: physicalPath });
                pathsToTry.push(...extensions.map((e) => ({ type: "extension", path: physicalPath + e })));
                pathsToTry.push({
                    type: "package",
                    path: path.join(physicalPath, "/package.json"),
                });
                const indexPath = path.join(physicalPath, "/index");
                pathsToTry.push(...extensions.map((e) => ({ type: "index", path: indexPath + e })));
            }
        }
    }
    return pathsToTry.length === 0 ? undefined : pathsToTry;
}
exports.getPathsToTry = getPathsToTry;
function getStrippedPath(tryPath) {
    return tryPath.type === "index"
        ? (0, path_1.dirname)(tryPath.path)
        : tryPath.type === "file"
            ? tryPath.path
            : tryPath.type === "extension"
                ? (0, filesystem_1.removeExtension)(tryPath.path)
                : tryPath.type === "package"
                    ? tryPath.path
                    : exhaustiveTypeException(tryPath.type);
}
exports.getStrippedPath = getStrippedPath;
function exhaustiveTypeException(check) {
    throw new Error(`Unknown type ${check}`);
}
exports.exhaustiveTypeException = exhaustiveTypeException;
function matchStar(pattern, search) {
    if (search.length < pattern.length) {
        return undefined;
    }
    if (pattern === "*") {
        return search;
    }
    const star = pattern.indexOf("*");
    if (star === -1) {
        return undefined;
    }
    const part1 = pattern.substring(0, star);
    const part2 = pattern.substring(star + 1);
    if (search.substr(0, star) !== part1) {
        return undefined;
    }
    if (search.substr(search.length - part2.length) !== part2) {
        return undefined;
    }
    return search.substr(star, search.length - part2.length);
}
//# sourceMappingURL=try-path.js.map