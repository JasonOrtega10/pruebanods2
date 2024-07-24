import { MonoTypeOperatorFunction, ObservableInput } from '../types';
export declare function audit<T>(durationSelector: (value: T) => ObservableInput<any>): MonoTypeOperatorFunction<T>;
