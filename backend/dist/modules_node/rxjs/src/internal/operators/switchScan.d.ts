import { ObservableInput, ObservedValueOf, OperatorFunction } from '../types';
export declare function switchScan<T, R, O extends ObservableInput<any>>(accumulator: (acc: R, value: T, index: number) => O, seed: R): OperatorFunction<T, ObservedValueOf<O>>;
