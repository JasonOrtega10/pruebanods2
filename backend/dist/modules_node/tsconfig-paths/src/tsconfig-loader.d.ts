export interface Tsconfig {
    extends?: string;
    compilerOptions?: {
        baseUrl?: string;
        paths?: {
            [key: string]: Array<string>;
        };
        strict?: boolean;
    };
}
export interface TsConfigLoaderResult {
    tsConfigPath: string | undefined;
    baseUrl: string | undefined;
    paths: {
        [key: string]: Array<string>;
    } | undefined;
}
export interface TsConfigLoaderParams {
    getEnv: (key: string) => string | undefined;
    cwd: string;
    loadSync?(cwd: string, filename?: string, baseUrl?: string): TsConfigLoaderResult;
}
export declare function tsConfigLoader({ getEnv, cwd, loadSync, }: TsConfigLoaderParams): TsConfigLoaderResult;
export declare function walkForTsConfig(directory: string, readdirSync?: (path: string) => string[]): string | undefined;
export declare function loadTsconfig(configFilePath: string, existsSync?: (path: string) => boolean, readFileSync?: (filename: string) => string): Tsconfig | undefined;
