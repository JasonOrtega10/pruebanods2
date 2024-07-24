"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsconfig_loader_1 = require("../tsconfig-loader");
const path_1 = require("path");
describe("tsconfig-loader", () => {
    it("should find tsconfig in cwd", () => {
        const result = (0, tsconfig_loader_1.tsConfigLoader)({
            cwd: "/foo/bar",
            getEnv: (_) => undefined,
            loadSync: (cwd) => {
                return {
                    tsConfigPath: `${cwd}/tsconfig.json`,
                    baseUrl: "./",
                    paths: {},
                };
            },
        });
        expect(result.tsConfigPath).toBe("/foo/bar/tsconfig.json");
    });
    it("should return loaderResult.tsConfigPath as undefined when not found", () => {
        const result = (0, tsconfig_loader_1.tsConfigLoader)({
            cwd: "/foo/bar",
            getEnv: (_) => undefined,
            loadSync: (_) => {
                return {
                    tsConfigPath: undefined,
                    baseUrl: "./",
                    paths: {},
                };
            },
        });
        expect(result.tsConfigPath).toBeUndefined();
    });
    it("should use TS_NODE_PROJECT env if exists", () => {
        const result = (0, tsconfig_loader_1.tsConfigLoader)({
            cwd: "/foo/bar",
            getEnv: (key) => key === "TS_NODE_PROJECT" ? "/foo/baz" : undefined,
            loadSync: (cwd, fileName) => {
                if (cwd === "/foo/bar" && fileName === "/foo/baz") {
                    return {
                        tsConfigPath: "/foo/baz/tsconfig.json",
                        baseUrl: "./",
                        paths: {},
                    };
                }
                return {
                    tsConfigPath: undefined,
                    baseUrl: "./",
                    paths: {},
                };
            },
        });
        expect(result.tsConfigPath).toBe("/foo/baz/tsconfig.json");
    });
    it("should use TS_NODE_BASEURL env if exists", () => {
        const result = (0, tsconfig_loader_1.tsConfigLoader)({
            cwd: "/foo/bar",
            getEnv: (key) => key === "TS_NODE_BASEURL" ? "SOME_BASEURL" : undefined,
            loadSync: (_0, _1, baseUrl) => {
                return {
                    tsConfigPath: undefined,
                    baseUrl,
                    paths: {},
                };
            },
        });
        expect(result.baseUrl).toBe("SOME_BASEURL");
    });
    it("should not use TS_NODE_BASEURL env if it does not exist", () => {
        const result = (0, tsconfig_loader_1.tsConfigLoader)({
            cwd: "/foo/bar",
            getEnv: (_) => {
                return undefined;
            },
            loadSync: (_0, _1, baseUrl) => {
                return {
                    tsConfigPath: undefined,
                    baseUrl,
                    paths: {},
                };
            },
        });
        expect(result.baseUrl).toBeUndefined();
    });
});
describe("walkForTsConfig", () => {
    it("should find tsconfig in starting directory", () => {
        const pathToTsconfig = (0, path_1.join)("/root", "dir1", "tsconfig.json");
        const mockFiles = {
            "/root/dir1": ["tsconfig.json"],
        };
        const res = (0, tsconfig_loader_1.walkForTsConfig)((0, path_1.join)("/root", "dir1"), (path) => mockFiles[path] || []);
        expect(res).toBe(pathToTsconfig);
    });
    it("should find jsconfig in starting directory", () => {
        const pathToJsconfig = (0, path_1.join)("/root", "dir1", "jsconfig.json");
        const mockFiles = {
            "/root/dir1": ["jsconfig.json"],
        };
        const res = (0, tsconfig_loader_1.walkForTsConfig)((0, path_1.join)("/root", "dir1"), (path) => mockFiles[path] || []);
        expect(res).toBe(pathToJsconfig);
    });
    it("tsconfig.json take precedence over jsconfig.json when both exist", () => {
        const pathToTsconfig = (0, path_1.join)("/root/dir1", "tsconfig.json");
        const mockFiles = {
            "/root/dir1": ["jsconfig.json", "tsconfig.json"],
        };
        const res = (0, tsconfig_loader_1.walkForTsConfig)((0, path_1.join)("/root", "dir1"), (path) => mockFiles[path] || []);
        expect(res).toBe(pathToTsconfig);
    });
    it("should find tsconfig in parent directory", () => {
        const pathToTsconfig = (0, path_1.join)("/root", "tsconfig.json");
        const mockFiles = {
            "/root": ["tsconfig.json"],
        };
        const res = (0, tsconfig_loader_1.walkForTsConfig)((0, path_1.join)("/root", "dir1"), (path) => mockFiles[path] || []);
        expect(res).toBe(pathToTsconfig);
    });
    it("should find jsconfig in parent directory", () => {
        const pathToTsconfig = (0, path_1.join)("/root", "jsconfig.json");
        const mockFiles = {
            "/root": ["jsconfig.json"],
        };
        const res = (0, tsconfig_loader_1.walkForTsConfig)((0, path_1.join)("/root", "dir1"), (path) => mockFiles[path] || []);
        expect(res).toBe(pathToTsconfig);
    });
    it("should return undefined when reaching the top", () => {
        const res = (0, tsconfig_loader_1.walkForTsConfig)((0, path_1.join)("/root", "dir1", "kalle"), () => []);
        expect(res).toBeUndefined();
    });
});
describe("loadConfig", () => {
    it("It should load a config", () => {
        const config = { compilerOptions: { baseUrl: "hej" } };
        const res = (0, tsconfig_loader_1.loadTsconfig)("/root/dir1/tsconfig.json", (path) => path === "/root/dir1/tsconfig.json", (_) => JSON.stringify(config));
        expect(res).toStrictEqual(config);
    });
    it("It should load a config with comments", () => {
        const config = { compilerOptions: { baseUrl: "hej" } };
        const res = (0, tsconfig_loader_1.loadTsconfig)("/root/dir1/tsconfig.json", (path) => path === "/root/dir1/tsconfig.json", (_) => `{
          // my comment
          "compilerOptions": { 
            "baseUrl": "hej"
          }
        }`);
        expect(res).toStrictEqual(config);
    });
    it("It should load a config with trailing commas", () => {
        const config = { compilerOptions: { baseUrl: "hej" } };
        const res = (0, tsconfig_loader_1.loadTsconfig)("/root/dir1/tsconfig.json", (path) => path === "/root/dir1/tsconfig.json", (_) => `{
          "compilerOptions": { 
            "baseUrl": "hej",
          },
        }`);
        expect(res).toStrictEqual(config);
    });
    it("It should throw an error including the file path when encountering invalid JSON5", () => {
        expect(() => (0, tsconfig_loader_1.loadTsconfig)("/root/dir1/tsconfig.json", (path) => path === "/root/dir1/tsconfig.json", (_) => `{
            "compilerOptions": {
          }`)).toThrowError("/root/dir1/tsconfig.json is malformed JSON5: invalid end of input at 3:12");
    });
    it("It should load a config with extends and overwrite all options", () => {
        const firstConfig = {
            extends: "../base-config.json",
            compilerOptions: { baseUrl: "kalle", paths: { foo: ["bar2"] } },
        };
        const firstConfigPath = (0, path_1.join)("/root", "dir1", "tsconfig.json");
        const baseConfig = {
            compilerOptions: {
                baseUrl: "olle",
                paths: { foo: ["bar1"] },
                strict: true,
            },
        };
        const baseConfigPath = (0, path_1.join)("/root", "base-config.json");
        const res = (0, tsconfig_loader_1.loadTsconfig)((0, path_1.join)("/root", "dir1", "tsconfig.json"), (path) => path === firstConfigPath || path === baseConfigPath, (path) => {
            if (path === firstConfigPath) {
                return JSON.stringify(firstConfig);
            }
            if (path === baseConfigPath) {
                return JSON.stringify(baseConfig);
            }
            return "";
        });
        expect(res).toEqual({
            extends: "../base-config.json",
            compilerOptions: {
                baseUrl: "kalle",
                paths: { foo: ["bar2"] },
                strict: true,
            },
        });
    });
    it("It should load a config with extends from node_modules and overwrite all options", () => {
        const firstConfig = {
            extends: "my-package/base-config.json",
            compilerOptions: { baseUrl: "kalle", paths: { foo: ["bar2"] } },
        };
        const firstConfigPath = (0, path_1.join)("/root", "dir1", "tsconfig.json");
        const baseConfig = {
            compilerOptions: {
                baseUrl: "olle",
                paths: { foo: ["bar1"] },
                strict: true,
            },
        };
        const baseConfigPath = (0, path_1.join)("/root", "dir1", "node_modules", "my-package", "base-config.json");
        const res = (0, tsconfig_loader_1.loadTsconfig)((0, path_1.join)("/root", "dir1", "tsconfig.json"), (path) => path === firstConfigPath || path === baseConfigPath, (path) => {
            if (path === firstConfigPath) {
                return JSON.stringify(firstConfig);
            }
            if (path === baseConfigPath) {
                return JSON.stringify(baseConfig);
            }
            return "";
        });
        expect(res).toEqual({
            extends: "my-package/base-config.json",
            compilerOptions: {
                baseUrl: "kalle",
                paths: { foo: ["bar2"] },
                strict: true,
            },
        });
    });
    it("Should use baseUrl relative to location of extended tsconfig", () => {
        const firstConfig = { compilerOptions: { baseUrl: "." } };
        const firstConfigPath = (0, path_1.join)("/root", "first-config.json");
        const secondConfig = { extends: "../first-config.json" };
        const secondConfigPath = (0, path_1.join)("/root", "dir1", "second-config.json");
        const thirdConfig = { extends: "../second-config.json" };
        const thirdConfigPath = (0, path_1.join)("/root", "dir1", "dir2", "third-config.json");
        const res = (0, tsconfig_loader_1.loadTsconfig)((0, path_1.join)("/root", "dir1", "dir2", "third-config.json"), (path) => path === firstConfigPath ||
            path === secondConfigPath ||
            path === thirdConfigPath, (path) => {
            if (path === firstConfigPath) {
                return JSON.stringify(firstConfig);
            }
            if (path === secondConfigPath) {
                return JSON.stringify(secondConfig);
            }
            if (path === thirdConfigPath) {
                return JSON.stringify(thirdConfig);
            }
            return "";
        });
        expect(res).toEqual({
            extends: "../second-config.json",
            compilerOptions: { baseUrl: (0, path_1.join)("..", "..") },
        });
    });
});
//# sourceMappingURL=tsconfig-loader.test.js.map