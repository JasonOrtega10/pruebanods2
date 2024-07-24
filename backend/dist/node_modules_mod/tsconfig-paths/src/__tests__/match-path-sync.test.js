"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const match_path_sync_1 = require("../match-path-sync");
const Tests = require("./data/match-path-data");
describe("match-path-sync", () => {
    Tests.tests.forEach((t) => it(t.name, () => {
        const matchPath = (0, match_path_sync_1.createMatchPath)(t.absoluteBaseUrl, t.paths, t.mainFields, t.addMatchAll);
        const result = matchPath(t.requestedModule, (_) => t.packageJson, (name) => t.existingFiles.indexOf(name) !== -1, t.extensions);
        expect(result).toBe(t.expectedPath);
    }));
});
//# sourceMappingURL=match-path-sync.test.js.map