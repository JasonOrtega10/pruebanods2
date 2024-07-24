import * as MappingEntry from "./mapping-entry";
import * as Filesystem from "./filesystem";
export interface MatchPathAsync {
    (requestedModule: string, readJson: Filesystem.ReadJsonAsync | undefined, fileExists: Filesystem.FileExistsAsync | undefined, extensions: ReadonlyArray<string> | undefined, callback: MatchPathAsyncCallback): void;
}
export interface MatchPathAsyncCallback {
    (err?: Error, path?: string): void;
}
export declare function createMatchPathAsync(absoluteBaseUrl: string, paths: {
    [key: string]: Array<string>;
}, mainFields?: (string | string[])[], addMatchAll?: boolean): MatchPathAsync;
export declare function matchFromAbsolutePathsAsync(absolutePathMappings: ReadonlyArray<MappingEntry.MappingEntry>, requestedModule: string, readJson: Filesystem.ReadJsonAsync, fileExists: Filesystem.FileExistsAsync, extensions: ReadonlyArray<string>, callback: MatchPathAsyncCallback, mainFields?: (string | string[])[]): void;
