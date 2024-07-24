import { MappingEntry } from "./mapping-entry";
export interface TryPath {
    readonly type: "file" | "extension" | "index" | "package";
    readonly path: string;
}
export declare function getPathsToTry(extensions: ReadonlyArray<string>, absolutePathMappings: ReadonlyArray<MappingEntry>, requestedModule: string): ReadonlyArray<TryPath> | undefined;
export declare function getStrippedPath(tryPath: TryPath): string;
export declare function exhaustiveTypeException(check: never): never;
