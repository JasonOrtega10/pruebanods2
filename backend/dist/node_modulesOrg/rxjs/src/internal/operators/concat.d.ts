import { ObservableInputTuple, OperatorFunction, SchedulerLike } from '../types';
export declare function concat<T, A extends readonly unknown[]>(...sources: [...ObservableInputTuple<A>]): OperatorFunction<T, T | A[number]>;
export declare function concat<T, A extends readonly unknown[]>(...sourcesAndScheduler: [...ObservableInputTuple<A>, SchedulerLike]): OperatorFunction<T, T | A[number]>;
