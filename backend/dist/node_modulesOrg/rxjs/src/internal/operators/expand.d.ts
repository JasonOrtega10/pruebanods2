import { OperatorFunction, ObservableInput, ObservedValueOf, SchedulerLike } from '../types';
export declare function expand<T, O extends ObservableInput<unknown>>(project: (value: T, index: number) => O, concurrent?: number, scheduler?: SchedulerLike): OperatorFunction<T, ObservedValueOf<O>>;
export declare function expand<T, O extends ObservableInput<unknown>>(project: (value: T, index: number) => O, concurrent: number | undefined, scheduler: SchedulerLike): OperatorFunction<T, ObservedValueOf<O>>;
