"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const try_path_1 = require("../try-path");
const path_1 = require("path");
describe("mapping-entry", () => {
    const abosolutePathMappings = [
        {
            pattern: "longest/pre/fix/*",
            paths: [(0, path_1.join)("/absolute", "base", "url", "foo2", "bar")],
        },
        { pattern: "pre/fix/*", paths: [(0, path_1.join)("/absolute", "base", "url", "foo3")] },
        { pattern: "*", paths: [(0, path_1.join)("/absolute", "base", "url", "foo1")] },
    ];
    const abosolutePathMappingsStarstWithSlash = [
        {
            pattern: "/opt/*",
            paths: [(0, path_1.join)("/absolute", "src", "aws-layer")],
        },
        {
            pattern: "*",
            paths: [(0, path_1.join)("/absolute", "src")],
        },
    ];
    it("should return no paths for relative requested module", () => {
        const result = (0, try_path_1.getPathsToTry)([".ts", "tsx"], abosolutePathMappings, "./requested-module");
        expect(result).toBeUndefined();
    });
    it("should return no paths if no pattern match the requested module", () => {
        const result = (0, try_path_1.getPathsToTry)([".ts", "tsx"], [
            {
                pattern: "longest/pre/fix/*",
                paths: [(0, path_1.join)("/absolute", "base", "url", "foo2", "bar")],
            },
            {
                pattern: "pre/fix/*",
                paths: [(0, path_1.join)("/absolute", "base", "url", "foo3")],
            },
        ], "requested-module");
        expect(result).toBeUndefined();
    });
    it("should get all paths that matches requested module", () => {
        const result = (0, try_path_1.getPathsToTry)([".ts", ".tsx"], abosolutePathMappings, "longest/pre/fix/requested-module");
        expect(result).toEqual([
            { type: "file", path: (0, path_1.join)("/absolute", "base", "url", "foo2", "bar") },
            {
                type: "extension",
                path: (0, path_1.join)("/absolute", "base", "url", "foo2", "bar.ts"),
            },
            {
                type: "extension",
                path: (0, path_1.join)("/absolute", "base", "url", "foo2", "bar.tsx"),
            },
            {
                type: "package",
                path: (0, path_1.join)("/absolute", "base", "url", "foo2", "bar", "package.json"),
            },
            {
                type: "index",
                path: (0, path_1.join)("/absolute", "base", "url", "foo2", "bar", "index.ts"),
            },
            {
                type: "index",
                path: (0, path_1.join)("/absolute", "base", "url", "foo2", "bar", "index.tsx"),
            },
            { type: "file", path: (0, path_1.join)("/absolute", "base", "url", "foo1") },
            { type: "extension", path: (0, path_1.join)("/absolute", "base", "url", "foo1.ts") },
            { type: "extension", path: (0, path_1.join)("/absolute", "base", "url", "foo1.tsx") },
            {
                type: "package",
                path: (0, path_1.join)("/absolute", "base", "url", "foo1", "package.json"),
            },
            {
                type: "index",
                path: (0, path_1.join)("/absolute", "base", "url", "foo1", "index.ts"),
            },
            {
                type: "index",
                path: (0, path_1.join)("/absolute", "base", "url", "foo1", "index.tsx"),
            },
        ]);
    });
    it("should resolve paths starting with a slash", () => {
        const result = (0, try_path_1.getPathsToTry)([".ts"], abosolutePathMappingsStarstWithSlash, "/opt/utils");
        expect(result).toEqual([
            {
                path: (0, path_1.join)("/absolute", "src", "aws-layer"),
                type: "file",
            },
            {
                path: (0, path_1.join)("/absolute", "src", "aws-layer.ts"),
                type: "extension",
            },
            {
                path: (0, path_1.join)("/absolute", "src", "aws-layer", "package.json"),
                type: "package",
            },
            {
                path: (0, path_1.join)("/absolute", "src", "aws-layer", "index.ts"),
                type: "index",
            },
            {
                path: (0, path_1.join)("/absolute", "src"),
                type: "file",
            },
            {
                path: (0, path_1.join)("/absolute", "src.ts"),
                type: "extension",
            },
            {
                path: (0, path_1.join)("/absolute", "src", "package.json"),
                type: "package",
            },
            {
                path: (0, path_1.join)("/absolute", "src", "index.ts"),
                type: "index",
            },
        ]);
    });
});
//# sourceMappingURL=try-path.test.js.map