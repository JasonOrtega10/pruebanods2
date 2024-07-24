"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeExtension = exports.fileExistsAsync = exports.readJsonFromDiskAsync = exports.readJsonFromDiskSync = exports.fileExistsSync = void 0;
const fs = require("fs");
function fileExistsSync(path) {
    if (!fs.existsSync(path)) {
        return false;
    }
    try {
        const stats = fs.statSync(path);
        return stats.isFile();
    }
    catch (err) {
        return false;
    }
}
exports.fileExistsSync = fileExistsSync;
function readJsonFromDiskSync(packageJsonPath) {
    if (!fs.existsSync(packageJsonPath)) {
        return undefined;
    }
    return require(packageJsonPath);
}
exports.readJsonFromDiskSync = readJsonFromDiskSync;
function readJsonFromDiskAsync(path, callback) {
    fs.readFile(path, "utf8", (err, result) => {
        if (err || !result) {
            return callback();
        }
        const json = JSON.parse(result);
        return callback(undefined, json);
    });
}
exports.readJsonFromDiskAsync = readJsonFromDiskAsync;
function fileExistsAsync(path2, callback2) {
    fs.stat(path2, (err, stats) => {
        if (err) {
            return callback2(undefined, false);
        }
        callback2(undefined, stats ? stats.isFile() : false);
    });
}
exports.fileExistsAsync = fileExistsAsync;
function removeExtension(path) {
    return path.substring(0, path.lastIndexOf(".")) || path;
}
exports.removeExtension = removeExtension;
//# sourceMappingURL=filesystem.js.map