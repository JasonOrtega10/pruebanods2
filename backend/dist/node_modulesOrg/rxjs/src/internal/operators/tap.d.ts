import { MonoTypeOperatorFunction, Observer } from '../types';
export interface TapObserver<T> extends Observer<T> {
    subscribe: () => void;
    unsubscribe: () => void;
    finalize: () => void;
}
export declare function tap<T>(observerOrNext?: Partial<TapObserver<T>> | ((value: T) => void)): MonoTypeOperatorFunction<T>;
export declare function tap<T>(next?: ((value: T) => void) | null, error?: ((error: any) => void) | null, complete?: (() => void) | null): MonoTypeOperatorFunction<T>;
