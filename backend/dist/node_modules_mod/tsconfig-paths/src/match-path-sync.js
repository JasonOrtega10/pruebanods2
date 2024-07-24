"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchFromAbsolutePaths = exports.createMatchPath = void 0;
const path = require("path");
const Filesystem = require("./filesystem");
const MappingEntry = require("./mapping-entry");
const TryPath = require("./try-path");
function createMatchPath(absoluteBaseUrl, paths, mainFields = ["main"], addMatchAll = true) {
    const absolutePaths = MappingEntry.getAbsoluteMappingEntries(absoluteBaseUrl, paths, addMatchAll);
    return (requestedModule, readJson, fileExists, extensions) => matchFromAbsolutePaths(absolutePaths, requestedModule, readJson, fileExists, extensions, mainFields);
}
exports.createMatchPath = createMatchPath;
function matchFromAbsolutePaths(absolutePathMappings, requestedModule, readJson = Filesystem.readJsonFromDiskSync, fileExists = Filesystem.fileExistsSync, extensions = Object.keys(require.extensions), mainFields = ["main"]) {
    const tryPaths = TryPath.getPathsToTry(extensions, absolutePathMappings, requestedModule);
    if (!tryPaths) {
        return undefined;
    }
    return findFirstExistingPath(tryPaths, readJson, fileExists, mainFields);
}
exports.matchFromAbsolutePaths = matchFromAbsolutePaths;
function findFirstExistingMainFieldMappedFile(packageJson, mainFields, packageJsonPath, fileExists) {
    for (let index = 0; index < mainFields.length; index++) {
        const mainFieldSelector = mainFields[index];
        const candidateMapping = typeof mainFieldSelector === "string"
            ? packageJson[mainFieldSelector]
            : mainFieldSelector.reduce((obj, key) => obj[key], packageJson);
        if (candidateMapping && typeof candidateMapping === "string") {
            const candidateFilePath = path.join(path.dirname(packageJsonPath), candidateMapping);
            if (fileExists(candidateFilePath)) {
                return candidateFilePath;
            }
        }
    }
    return undefined;
}
function findFirstExistingPath(tryPaths, readJson = Filesystem.readJsonFromDiskSync, fileExists, mainFields = ["main"]) {
    for (const tryPath of tryPaths) {
        if (tryPath.type === "file" ||
            tryPath.type === "extension" ||
            tryPath.type === "index") {
            if (fileExists(tryPath.path)) {
                return TryPath.getStrippedPath(tryPath);
            }
        }
        else if (tryPath.type === "package") {
            const packageJson = readJson(tryPath.path);
            if (packageJson) {
                const mainFieldMappedFile = findFirstExistingMainFieldMappedFile(packageJson, mainFields, tryPath.path, fileExists);
                if (mainFieldMappedFile) {
                    return mainFieldMappedFile;
                }
            }
        }
        else {
            TryPath.exhaustiveTypeException(tryPath.type);
        }
    }
    return undefined;
}
//# sourceMappingURL=match-path-sync.js.map