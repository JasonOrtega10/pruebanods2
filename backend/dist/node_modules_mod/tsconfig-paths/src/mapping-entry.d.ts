export interface MappingEntry {
    readonly pattern: string;
    readonly paths: ReadonlyArray<string>;
}
export interface Paths {
    readonly [key: string]: ReadonlyArray<string>;
}
export declare function getAbsoluteMappingEntries(absoluteBaseUrl: string, paths: Paths, addMatchAll: boolean): ReadonlyArray<MappingEntry>;
