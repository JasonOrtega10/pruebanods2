import { MonoTypeOperatorFunction, SchedulerLike } from '../types';
export declare function throttleTime<T>(duration: number, scheduler?: SchedulerLike, config?: import("./throttle").ThrottleConfig): MonoTypeOperatorFunction<T>;
