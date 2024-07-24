import * as Filesystem from "./filesystem";
import * as MappingEntry from "./mapping-entry";
export interface MatchPath {
    (requestedModule: string, readJson?: Filesystem.ReadJsonSync, fileExists?: (name: string) => boolean, extensions?: ReadonlyArray<string>): string | undefined;
}
export declare function createMatchPath(absoluteBaseUrl: string, paths: {
    [key: string]: Array<string>;
}, mainFields?: (string | string[])[], addMatchAll?: boolean): MatchPath;
export declare function matchFromAbsolutePaths(absolutePathMappings: ReadonlyArray<MappingEntry.MappingEntry>, requestedModule: string, readJson?: Filesystem.ReadJsonSync, fileExists?: Filesystem.FileExistsSync, extensions?: Array<string>, mainFields?: (string | string[])[]): string | undefined;
