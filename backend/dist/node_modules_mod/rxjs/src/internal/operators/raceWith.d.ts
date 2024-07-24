import { OperatorFunction, ObservableInputTuple } from '../types';
export declare function raceWith<T, A extends readonly unknown[]>(...otherSources: [...ObservableInputTuple<A>]): OperatorFunction<T, T | A[number]>;
