import { MonoTypeOperatorFunction, ObservableInput } from '../types';
export interface ThrottleConfig {
    leading?: boolean;
    trailing?: boolean;
}
export declare const defaultThrottleConfig: ThrottleConfig;
export declare function throttle<T>(durationSelector: (value: T) => ObservableInput<any>, config?: ThrottleConfig): MonoTypeOperatorFunction<T>;
