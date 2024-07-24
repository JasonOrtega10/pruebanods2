import { MonoTypeOperatorFunction, SubjectLike, ObservableInput } from '../types';
export interface ShareConfig<T> {
    connector?: () => SubjectLike<T>;
    resetOnError?: boolean | ((error: any) => ObservableInput<any>);
    resetOnComplete?: boolean | (() => ObservableInput<any>);
    resetOnRefCountZero?: boolean | (() => ObservableInput<any>);
}
export declare function share<T>(): MonoTypeOperatorFunction<T>;
export declare function share<T>(options: ShareConfig<T>): MonoTypeOperatorFunction<T>;
