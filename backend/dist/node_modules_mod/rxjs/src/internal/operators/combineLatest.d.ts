import { ObservableInputTuple, OperatorFunction } from '../types';
export declare function combineLatest<T, A extends readonly unknown[], R>(sources: [...ObservableInputTuple<A>], project: (...values: [T, ...A]) => R): OperatorFunction<T, R>;
export declare function combineLatest<T, A extends readonly unknown[], R>(sources: [...ObservableInputTuple<A>]): OperatorFunction<T, [T, ...A]>;
export declare function combineLatest<T, A extends readonly unknown[], R>(...sourcesAndProject: [...ObservableInputTuple<A>, (...values: [T, ...A]) => R]): OperatorFunction<T, R>;
export declare function combineLatest<T, A extends readonly unknown[], R>(...sources: [...ObservableInputTuple<A>]): OperatorFunction<T, [T, ...A]>;
