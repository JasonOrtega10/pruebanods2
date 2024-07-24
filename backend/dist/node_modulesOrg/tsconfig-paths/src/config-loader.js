"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configLoader = exports.loadConfig = void 0;
const TsConfigLoader2 = require("./tsconfig-loader");
const path = require("path");
function loadConfig(cwd = process.cwd()) {
    return configLoader({ cwd });
}
exports.loadConfig = loadConfig;
function configLoader({ cwd, explicitParams, tsConfigLoader = TsConfigLoader2.tsConfigLoader, }) {
    if (explicitParams) {
        const absoluteBaseUrl = path.isAbsolute(explicitParams.baseUrl)
            ? explicitParams.baseUrl
            : path.join(cwd, explicitParams.baseUrl);
        return {
            resultType: "success",
            configFileAbsolutePath: "",
            baseUrl: explicitParams.baseUrl,
            absoluteBaseUrl,
            paths: explicitParams.paths,
            mainFields: explicitParams.mainFields,
            addMatchAll: explicitParams.addMatchAll,
        };
    }
    const loadResult = tsConfigLoader({
        cwd,
        getEnv: (key) => process.env[key],
    });
    if (!loadResult.tsConfigPath) {
        return {
            resultType: "failed",
            message: "Couldn't find tsconfig.json",
        };
    }
    return {
        resultType: "success",
        configFileAbsolutePath: loadResult.tsConfigPath,
        baseUrl: loadResult.baseUrl,
        absoluteBaseUrl: path.resolve(path.dirname(loadResult.tsConfigPath), loadResult.baseUrl || ""),
        paths: loadResult.paths || {},
        addMatchAll: loadResult.baseUrl !== undefined,
    };
}
exports.configLoader = configLoader;
//# sourceMappingURL=config-loader.js.map