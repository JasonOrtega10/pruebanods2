"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const match_path_sync_1 = require("./match-path-sync");
const config_loader_1 = require("./config-loader");
const noOp = () => void 0;
function getCoreModules(builtinModules) {
    builtinModules = builtinModules || [
        "assert",
        "buffer",
        "child_process",
        "cluster",
        "crypto",
        "dgram",
        "dns",
        "domain",
        "events",
        "fs",
        "http",
        "https",
        "net",
        "os",
        "path",
        "punycode",
        "querystring",
        "readline",
        "stream",
        "string_decoder",
        "tls",
        "tty",
        "url",
        "util",
        "v8",
        "vm",
        "zlib",
    ];
    const coreModules = {};
    for (let module of builtinModules) {
        coreModules[module] = true;
    }
    return coreModules;
}
function register(params) {
    let cwd;
    let explicitParams;
    if (params) {
        cwd = params.cwd;
        if (params.baseUrl || params.paths) {
            explicitParams = params;
        }
    }
    else {
        const minimist = require("minimist");
        const argv = minimist(process.argv.slice(2), {
            string: ["project"],
            alias: {
                project: ["P"],
            },
        });
        cwd = argv.project;
    }
    const configLoaderResult = (0, config_loader_1.configLoader)({
        cwd: cwd !== null && cwd !== void 0 ? cwd : process.cwd(),
        explicitParams,
    });
    if (configLoaderResult.resultType === "failed") {
        console.warn(`${configLoaderResult.message}. tsconfig-paths will be skipped`);
        return noOp;
    }
    const matchPath = (0, match_path_sync_1.createMatchPath)(configLoaderResult.absoluteBaseUrl, configLoaderResult.paths, configLoaderResult.mainFields, configLoaderResult.addMatchAll);
    const Module = require("module");
    const originalResolveFilename = Module._resolveFilename;
    const coreModules = getCoreModules(Module.builtinModules);
    Module._resolveFilename = function (request, _parent) {
        const isCoreModule = coreModules.hasOwnProperty(request);
        if (!isCoreModule) {
            const found = matchPath(request);
            if (found) {
                const modifiedArguments = [found, ...[].slice.call(arguments, 1)];
                return originalResolveFilename.apply(this, modifiedArguments);
            }
        }
        return originalResolveFilename.apply(this, arguments);
    };
    return () => {
        Module._resolveFilename = originalResolveFilename;
    };
}
exports.register = register;
//# sourceMappingURL=register.js.map