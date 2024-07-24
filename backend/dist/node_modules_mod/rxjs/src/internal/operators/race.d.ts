import { ObservableInputTuple, OperatorFunction } from '../types';
export declare function race<T, A extends readonly unknown[]>(otherSources: [...ObservableInputTuple<A>]): OperatorFunction<T, T | A[number]>;
export declare function race<T, A extends readonly unknown[]>(...otherSources: [...ObservableInputTuple<A>]): OperatorFunction<T, T | A[number]>;
