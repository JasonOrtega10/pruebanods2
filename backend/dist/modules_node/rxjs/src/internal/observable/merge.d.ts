import { Observable } from '../Observable';
import { ObservableInputTuple, SchedulerLike } from '../types';
export declare function merge<A extends readonly unknown[]>(...sources: [...ObservableInputTuple<A>]): Observable<A[number]>;
export declare function merge<A extends readonly unknown[]>(...sourcesAndConcurrency: [...ObservableInputTuple<A>, number?]): Observable<A[number]>;
export declare function merge<A extends readonly unknown[]>(...sourcesAndScheduler: [...ObservableInputTuple<A>, SchedulerLike?]): Observable<A[number]>;
export declare function merge<A extends readonly unknown[]>(...sourcesAndConcurrencyAndScheduler: [...ObservableInputTuple<A>, number?, SchedulerLike?]): Observable<A[number]>;
