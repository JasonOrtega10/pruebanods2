export interface PackageJson {
    [key: string]: string | PackageJson;
}
export interface ReadJsonSync {
    (packageJsonPath: string): any | undefined;
}
export interface FileExistsSync {
    (name: string): boolean;
}
export interface FileExistsAsync {
    (path: string, callback: (err?: Error, exists?: boolean) => void): void;
}
export interface ReadJsonAsyncCallback {
    (err?: Error, content?: any): void;
}
export interface ReadJsonAsync {
    (path: string, callback: ReadJsonAsyncCallback): void;
}
export declare function fileExistsSync(path: string): boolean;
export declare function readJsonFromDiskSync(packageJsonPath: string): any | undefined;
export declare function readJsonFromDiskAsync(path: string, callback: (err?: Error, content?: any) => void): void;
export declare function fileExistsAsync(path2: string, callback2: (err?: Error, exists?: boolean) => void): void;
export declare function removeExtension(path: string): string;
