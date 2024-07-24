export interface NotFoundError extends Error {
}
export interface NotFoundErrorCtor {
    new (message: string): NotFoundError;
}
export declare const NotFoundError: NotFoundErrorCtor;
