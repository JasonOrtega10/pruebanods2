import { ObservableInputTuple, OperatorFunction } from '../types';
export declare function mergeWith<T, A extends readonly unknown[]>(...otherSources: [...ObservableInputTuple<A>]): OperatorFunction<T, T | A[number]>;
