"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTsconfig = exports.walkForTsConfig = exports.tsConfigLoader = void 0;
const path = require("path");
const fs = require("fs");
const JSON5 = require("json5");
const StripBom = require("strip-bom");
function tsConfigLoader({ getEnv, cwd, loadSync = loadSyncDefault, }) {
    const TS_NODE_PROJECT = getEnv("TS_NODE_PROJECT");
    const TS_NODE_BASEURL = getEnv("TS_NODE_BASEURL");
    const loadResult = loadSync(cwd, TS_NODE_PROJECT, TS_NODE_BASEURL);
    return loadResult;
}
exports.tsConfigLoader = tsConfigLoader;
function loadSyncDefault(cwd, filename, baseUrl) {
    const configPath = resolveConfigPath(cwd, filename);
    if (!configPath) {
        return {
            tsConfigPath: undefined,
            baseUrl: undefined,
            paths: undefined,
        };
    }
    const config = loadTsconfig(configPath);
    return {
        tsConfigPath: configPath,
        baseUrl: baseUrl ||
            (config && config.compilerOptions && config.compilerOptions.baseUrl),
        paths: config && config.compilerOptions && config.compilerOptions.paths,
    };
}
function resolveConfigPath(cwd, filename) {
    if (filename) {
        const absolutePath = fs.lstatSync(filename).isDirectory()
            ? path.resolve(filename, "./tsconfig.json")
            : path.resolve(cwd, filename);
        return absolutePath;
    }
    if (fs.statSync(cwd).isFile()) {
        return path.resolve(cwd);
    }
    const configAbsolutePath = walkForTsConfig(cwd);
    return configAbsolutePath ? path.resolve(configAbsolutePath) : undefined;
}
function walkForTsConfig(directory, readdirSync = fs.readdirSync) {
    const files = readdirSync(directory);
    const filesToCheck = ["tsconfig.json", "jsconfig.json"];
    for (const fileToCheck of filesToCheck) {
        if (files.indexOf(fileToCheck) !== -1) {
            return path.join(directory, fileToCheck);
        }
    }
    const parentDirectory = path.dirname(directory);
    if (directory === parentDirectory) {
        return undefined;
    }
    return walkForTsConfig(parentDirectory, readdirSync);
}
exports.walkForTsConfig = walkForTsConfig;
function loadTsconfig(configFilePath, existsSync = fs.existsSync, readFileSync = (filename) => fs.readFileSync(filename, "utf8")) {
    if (!existsSync(configFilePath)) {
        return undefined;
    }
    const configString = readFileSync(configFilePath);
    const cleanedJson = StripBom(configString);
    let config;
    try {
        config = JSON5.parse(cleanedJson);
    }
    catch (e) {
        throw new Error(`${configFilePath} is malformed ${e.message}`);
    }
    let extendedConfig = config.extends;
    if (extendedConfig) {
        if (typeof extendedConfig === "string" &&
            extendedConfig.indexOf(".json") === -1) {
            extendedConfig += ".json";
        }
        const currentDir = path.dirname(configFilePath);
        let extendedConfigPath = path.join(currentDir, extendedConfig);
        if (extendedConfig.indexOf("/") !== -1 &&
            extendedConfig.indexOf(".") !== -1 &&
            !existsSync(extendedConfigPath)) {
            extendedConfigPath = path.join(currentDir, "node_modules", extendedConfig);
        }
        const base = loadTsconfig(extendedConfigPath, existsSync, readFileSync) || {};
        if (base.compilerOptions && base.compilerOptions.baseUrl) {
            const extendsDir = path.dirname(extendedConfig);
            base.compilerOptions.baseUrl = path.join(extendsDir, base.compilerOptions.baseUrl);
        }
        return Object.assign(Object.assign(Object.assign({}, base), config), { compilerOptions: Object.assign(Object.assign({}, base.compilerOptions), config.compilerOptions) });
    }
    return config;
}
exports.loadTsconfig = loadTsconfig;
//# sourceMappingURL=tsconfig-loader.js.map