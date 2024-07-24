import { ObservableInputTuple, OperatorFunction, SchedulerLike } from '../types';
export declare function merge<T, A extends readonly unknown[]>(...sources: [...ObservableInputTuple<A>]): OperatorFunction<T, T | A[number]>;
export declare function merge<T, A extends readonly unknown[]>(...sourcesAndConcurrency: [...ObservableInputTuple<A>, number]): OperatorFunction<T, T | A[number]>;
export declare function merge<T, A extends readonly unknown[]>(...sourcesAndScheduler: [...ObservableInputTuple<A>, SchedulerLike]): OperatorFunction<T, T | A[number]>;
export declare function merge<T, A extends readonly unknown[]>(...sourcesAndConcurrencyAndScheduler: [...ObservableInputTuple<A>, number, SchedulerLike]): OperatorFunction<T, T | A[number]>;
