import { MonoTypeOperatorFunction, ObservableInput } from '../types';
export declare function debounce<T>(durationSelector: (value: T) => ObservableInput<any>): MonoTypeOperatorFunction<T>;
