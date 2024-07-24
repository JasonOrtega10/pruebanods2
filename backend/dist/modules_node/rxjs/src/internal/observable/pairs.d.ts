import { Observable } from '../Observable';
import { SchedulerLike } from '../types';
export declare function pairs<T>(arr: readonly T[], scheduler?: SchedulerLike): Observable<[string, T]>;
export declare function pairs<O extends Record<string, unknown>>(obj: O, scheduler?: SchedulerLike): Observable<[keyof O, O[keyof O]]>;
export declare function pairs<T>(iterable: Iterable<T>, scheduler?: SchedulerLike): Observable<[string, T]>;
export declare function pairs(n: number | bigint | boolean | ((...args: any[]) => any) | symbol, scheduler?: SchedulerLike): Observable<[never, never]>;
