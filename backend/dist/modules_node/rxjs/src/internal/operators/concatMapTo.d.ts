import { ObservableInput, OperatorFunction, ObservedValueOf } from '../types';
export declare function concatMapTo<O extends ObservableInput<unknown>>(observable: O): OperatorFunction<unknown, ObservedValueOf<O>>;
export declare function concatMapTo<O extends ObservableInput<unknown>>(observable: O, resultSelector: undefined): OperatorFunction<unknown, ObservedValueOf<O>>;
export declare function concatMapTo<T, R, O extends ObservableInput<unknown>>(observable: O, resultSelector: (outerValue: T, innerValue: ObservedValueOf<O>, outerIndex: number, innerIndex: number) => R): OperatorFunction<T, R>;
