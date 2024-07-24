import { OperatorFunction, ObservableInput, ObservedValueOf } from '../types';
export declare function mergeAll<O extends ObservableInput<any>>(concurrent?: number): OperatorFunction<O, ObservedValueOf<O>>;
