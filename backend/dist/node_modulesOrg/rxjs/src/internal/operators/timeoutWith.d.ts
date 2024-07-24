import { ObservableInput, OperatorFunction, SchedulerLike } from '../types';
export declare function timeoutWith<T, R>(dueBy: Date, switchTo: ObservableInput<R>, scheduler?: SchedulerLike): OperatorFunction<T, T | R>;
export declare function timeoutWith<T, R>(waitFor: number, switchTo: ObservableInput<R>, scheduler?: SchedulerLike): OperatorFunction<T, T | R>;
