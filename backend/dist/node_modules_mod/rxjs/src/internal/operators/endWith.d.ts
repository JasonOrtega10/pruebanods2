import { MonoTypeOperatorFunction, SchedulerLike, OperatorFunction, ValueFromArray } from '../types';
export declare function endWith<T>(scheduler: SchedulerLike): MonoTypeOperatorFunction<T>;
export declare function endWith<T, A extends unknown[] = T[]>(...valuesAndScheduler: [...A, SchedulerLike]): OperatorFunction<T, T | ValueFromArray<A>>;
export declare function endWith<T, A extends unknown[] = T[]>(...values: A): OperatorFunction<T, T | ValueFromArray<A>>;
