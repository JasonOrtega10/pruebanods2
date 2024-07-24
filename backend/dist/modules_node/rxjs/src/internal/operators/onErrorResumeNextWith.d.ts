import { ObservableInputTuple, OperatorFunction } from '../types';
export declare function onErrorResumeNextWith<T, A extends readonly unknown[]>(sources: [...ObservableInputTuple<A>]): OperatorFunction<T, T | A[number]>;
export declare function onErrorResumeNextWith<T, A extends readonly unknown[]>(...sources: [...ObservableInputTuple<A>]): OperatorFunction<T, T | A[number]>;
export declare const onErrorResumeNext: typeof onErrorResumeNextWith;
