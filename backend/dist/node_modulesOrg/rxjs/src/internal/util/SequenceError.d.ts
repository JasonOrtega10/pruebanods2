export interface SequenceError extends Error {
}
export interface SequenceErrorCtor {
    new (message: string): SequenceError;
}
export declare const SequenceError: SequenceErrorCtor;
