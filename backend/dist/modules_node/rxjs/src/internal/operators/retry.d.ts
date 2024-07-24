import { MonoTypeOperatorFunction, ObservableInput } from '../types';
export interface RetryConfig {
    count?: number;
    delay?: number | ((error: any, retryCount: number) => ObservableInput<any>);
    resetOnSuccess?: boolean;
}
export declare function retry<T>(count?: number): MonoTypeOperatorFunction<T>;
export declare function retry<T>(config: RetryConfig): MonoTypeOperatorFunction<T>;
