import { MonoTypeOperatorFunction, SchedulerLike, OperatorFunction, ObservableInput, ObservedValueOf } from '../types';
export interface TimeoutConfig<T, O extends ObservableInput<unknown> = ObservableInput<T>, M = unknown> {
    each?: number;
    first?: number | Date;
    scheduler?: SchedulerLike;
    with?: (info: TimeoutInfo<T, M>) => O;
    meta?: M;
}
export interface TimeoutInfo<T, M = unknown> {
    readonly meta: M;
    readonly seen: number;
    readonly lastValue: T | null;
}
export interface TimeoutError<T = unknown, M = unknown> extends Error {
    info: TimeoutInfo<T, M> | null;
}
export interface TimeoutErrorCtor {
    new <T = unknown, M = unknown>(info?: TimeoutInfo<T, M>): TimeoutError<T, M>;
}
export declare const TimeoutError: TimeoutErrorCtor;
export declare function timeout<T, O extends ObservableInput<unknown>, M = unknown>(config: TimeoutConfig<T, O, M> & {
    with: (info: TimeoutInfo<T, M>) => O;
}): OperatorFunction<T, T | ObservedValueOf<O>>;
export declare function timeout<T, M = unknown>(config: Omit<TimeoutConfig<T, any, M>, 'with'>): OperatorFunction<T, T>;
export declare function timeout<T>(first: Date, scheduler?: SchedulerLike): MonoTypeOperatorFunction<T>;
export declare function timeout<T>(each: number, scheduler?: SchedulerLike): MonoTypeOperatorFunction<T>;
