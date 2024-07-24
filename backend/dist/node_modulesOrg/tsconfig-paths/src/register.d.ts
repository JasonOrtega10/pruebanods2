import { ExplicitParams } from "./config-loader";
export interface RegisterParams extends ExplicitParams {
    cwd?: string;
}
export declare function register(params?: RegisterParams): () => void;
