import { MonoTypeOperatorFunction, SchedulerLike } from '../types';
export declare function observeOn<T>(scheduler: SchedulerLike, delay?: number): MonoTypeOperatorFunction<T>;
