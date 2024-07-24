import { ObservableInput, OperatorFunction, ObservedValueOf } from '../types';
export declare function mergeMap<T, O extends ObservableInput<any>>(project: (value: T, index: number) => O, concurrent?: number): OperatorFunction<T, ObservedValueOf<O>>;
export declare function mergeMap<T, O extends ObservableInput<any>>(project: (value: T, index: number) => O, resultSelector: undefined, concurrent?: number): OperatorFunction<T, ObservedValueOf<O>>;
export declare function mergeMap<T, R, O extends ObservableInput<any>>(project: (value: T, index: number) => O, resultSelector: (outerValue: T, innerValue: ObservedValueOf<O>, outerIndex: number, innerIndex: number) => R, concurrent?: number): OperatorFunction<T, R>;
