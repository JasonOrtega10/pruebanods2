import { MonoTypeOperatorFunction, SchedulerLike } from '../types';
export declare function delay<T>(due: number | Date, scheduler?: SchedulerLike): MonoTypeOperatorFunction<T>;
