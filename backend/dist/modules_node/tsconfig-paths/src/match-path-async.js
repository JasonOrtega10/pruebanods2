"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchFromAbsolutePathsAsync = exports.createMatchPathAsync = void 0;
const path = require("path");
const TryPath = require("./try-path");
const MappingEntry = require("./mapping-entry");
const Filesystem = require("./filesystem");
function createMatchPathAsync(absoluteBaseUrl, paths, mainFields = ["main"], addMatchAll = true) {
    const absolutePaths = MappingEntry.getAbsoluteMappingEntries(absoluteBaseUrl, paths, addMatchAll);
    return (requestedModule, readJson, fileExists, extensions, callback) => matchFromAbsolutePathsAsync(absolutePaths, requestedModule, readJson, fileExists, extensions, callback, mainFields);
}
exports.createMatchPathAsync = createMatchPathAsync;
function matchFromAbsolutePathsAsync(absolutePathMappings, requestedModule, readJson = Filesystem.readJsonFromDiskAsync, fileExists = Filesystem.fileExistsAsync, extensions = Object.keys(require.extensions), callback, mainFields = ["main"]) {
    const tryPaths = TryPath.getPathsToTry(extensions, absolutePathMappings, requestedModule);
    if (!tryPaths) {
        return callback();
    }
    findFirstExistingPath(tryPaths, readJson, fileExists, callback, 0, mainFields);
}
exports.matchFromAbsolutePathsAsync = matchFromAbsolutePathsAsync;
function findFirstExistingMainFieldMappedFile(packageJson, mainFields, packageJsonPath, fileExistsAsync, doneCallback, index = 0) {
    if (index >= mainFields.length) {
        return doneCallback(undefined, undefined);
    }
    const tryNext = () => findFirstExistingMainFieldMappedFile(packageJson, mainFields, packageJsonPath, fileExistsAsync, doneCallback, index + 1);
    const mainFieldSelector = mainFields[index];
    const mainFieldMapping = typeof mainFieldSelector === "string"
        ? packageJson[mainFieldSelector]
        : mainFieldSelector.reduce((obj, key) => obj[key], packageJson);
    if (typeof mainFieldMapping !== "string") {
        return tryNext();
    }
    const mappedFilePath = path.join(path.dirname(packageJsonPath), mainFieldMapping);
    fileExistsAsync(mappedFilePath, (err, exists) => {
        if (err) {
            return doneCallback(err);
        }
        if (exists) {
            return doneCallback(undefined, mappedFilePath);
        }
        return tryNext();
    });
}
function findFirstExistingPath(tryPaths, readJson, fileExists, doneCallback, index = 0, mainFields = ["main"]) {
    const tryPath = tryPaths[index];
    if (tryPath.type === "file" ||
        tryPath.type === "extension" ||
        tryPath.type === "index") {
        fileExists(tryPath.path, (err, exists) => {
            if (err) {
                return doneCallback(err);
            }
            if (exists) {
                return doneCallback(undefined, TryPath.getStrippedPath(tryPath));
            }
            if (index === tryPaths.length - 1) {
                return doneCallback();
            }
            return findFirstExistingPath(tryPaths, readJson, fileExists, doneCallback, index + 1, mainFields);
        });
    }
    else if (tryPath.type === "package") {
        readJson(tryPath.path, (err, packageJson) => {
            if (err) {
                return doneCallback(err);
            }
            if (packageJson) {
                return findFirstExistingMainFieldMappedFile(packageJson, mainFields, tryPath.path, fileExists, (mainFieldErr, mainFieldMappedFile) => {
                    if (mainFieldErr) {
                        return doneCallback(mainFieldErr);
                    }
                    if (mainFieldMappedFile) {
                        return doneCallback(undefined, mainFieldMappedFile);
                    }
                    return findFirstExistingPath(tryPaths, readJson, fileExists, doneCallback, index + 1, mainFields);
                });
            }
            return findFirstExistingPath(tryPaths, readJson, fileExists, doneCallback, index + 1, mainFields);
        });
    }
    else {
        TryPath.exhaustiveTypeException(tryPath.type);
    }
}
//# sourceMappingURL=match-path-async.js.map