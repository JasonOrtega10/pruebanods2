import { ObservableInputTuple, OperatorFunction } from '../types';
export declare function concatWith<T, A extends readonly unknown[]>(...otherSources: [...ObservableInputTuple<A>]): OperatorFunction<T, T | A[number]>;
