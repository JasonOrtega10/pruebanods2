"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_loader_1 = require("../config-loader");
const path_1 = require("path");
describe("config-loader", () => {
    it("should use explicitParams when set", () => {
        const result = (0, config_loader_1.configLoader)({
            explicitParams: {
                baseUrl: "/foo/bar",
                paths: {
                    asd: ["asd"],
                },
            },
            cwd: "/baz",
        });
        const successResult = result;
        expect(successResult.resultType).toBe("success");
        expect(successResult.absoluteBaseUrl).toBe("/foo/bar");
        expect(successResult.paths["asd"][0]).toBe("asd");
    });
    it("should use explicitParams when set and add cwd when path is relative", () => {
        const result = (0, config_loader_1.configLoader)({
            explicitParams: {
                baseUrl: "bar/",
                paths: {
                    asd: ["asd"],
                },
            },
            cwd: "/baz",
        });
        const successResult = result;
        expect(successResult.resultType).toBe("success");
        expect(successResult.absoluteBaseUrl).toBe((0, path_1.join)("/baz", "bar/"));
    });
    it("should fallback to tsConfigLoader when explicitParams is not set", () => {
        const result = (0, config_loader_1.configLoader)({
            explicitParams: undefined,
            cwd: "/baz",
            tsConfigLoader: () => ({
                tsConfigPath: "/baz/tsconfig.json",
                baseUrl: "./src",
                paths: {},
            }),
        });
        const successResult = result;
        expect(successResult.resultType).toBe("success");
        expect(successResult.absoluteBaseUrl).toBe((0, path_1.join)("/baz", "src"));
    });
    it("should tolerate a missing baseUrl", () => {
        const result = (0, config_loader_1.configLoader)({
            explicitParams: undefined,
            cwd: "/baz",
            tsConfigLoader: () => ({
                tsConfigPath: "/baz/tsconfig.json",
                baseUrl: undefined,
                paths: {},
            }),
        });
        const failResult = result;
        expect(failResult.resultType).toBe("success");
    });
    it("should presume cwd to be a tsconfig file when loadConfig is called with absolute path to tsconfig.json", () => {
        const configFile = (0, path_1.join)(__dirname, "tsconfig-named.json");
        const result = (0, config_loader_1.loadConfig)(configFile);
        const successResult = result;
        expect(successResult.resultType).toBe("success");
        expect(successResult.configFileAbsolutePath).toBe(configFile);
    });
    it("should allow an absolute baseUrl in tsconfig.json", () => {
        const result = (0, config_loader_1.configLoader)({
            explicitParams: undefined,
            cwd: "/baz",
            tsConfigLoader: () => ({
                tsConfigPath: "/baz/tsconfig.json",
                baseUrl: "/baz",
                paths: {},
            }),
        });
        const successResult = result;
        expect(successResult.absoluteBaseUrl).toEqual("/baz");
    });
});
//# sourceMappingURL=config-loader.test.js.map