"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const match_path_async_1 = require("../match-path-async");
const Tests = require("./data/match-path-data");
describe("match-path-async", () => {
    Tests.tests.forEach((t) => it(t.name, (done) => {
        const matchPath = (0, match_path_async_1.createMatchPathAsync)(t.absoluteBaseUrl, t.paths, t.mainFields, t.addMatchAll);
        matchPath(t.requestedModule, (_path, callback) => callback(undefined, t.packageJson), (path, callback) => callback(undefined, t.existingFiles.indexOf(path) !== -1), t.extensions, (_err, result) => {
            expect(result).toBe(t.expectedPath);
            done();
        });
    }));
});
//# sourceMappingURL=match-path-async.test.js.map