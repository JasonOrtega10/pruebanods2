import { OperatorFunction, ObservedValueOf, ObservableInput } from '../types';
export declare function mergeMapTo<O extends ObservableInput<unknown>>(innerObservable: O, concurrent?: number): OperatorFunction<unknown, ObservedValueOf<O>>;
export declare function mergeMapTo<T, R, O extends ObservableInput<unknown>>(innerObservable: O, resultSelector: (outerValue: T, innerValue: ObservedValueOf<O>, outerIndex: number, innerIndex: number) => R, concurrent?: number): OperatorFunction<T, R>;
