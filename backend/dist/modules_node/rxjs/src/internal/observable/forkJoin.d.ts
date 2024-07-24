import { Observable } from '../Observable';
import { ObservedValueOf, ObservableInputTuple, ObservableInput } from '../types';
import { AnyCatcher } from '../AnyCatcher';
export declare function forkJoin<T extends AnyCatcher>(arg: T): Observable<unknown>;
export declare function forkJoin(scheduler: null | undefined): Observable<never>;
export declare function forkJoin(sources: readonly []): Observable<never>;
export declare function forkJoin<A extends readonly unknown[]>(sources: readonly [...ObservableInputTuple<A>]): Observable<A>;
export declare function forkJoin<A extends readonly unknown[], R>(sources: readonly [...ObservableInputTuple<A>], resultSelector: (...values: A) => R): Observable<R>;
export declare function forkJoin<A extends readonly unknown[]>(...sources: [...ObservableInputTuple<A>]): Observable<A>;
export declare function forkJoin<A extends readonly unknown[], R>(...sourcesAndResultSelector: [...ObservableInputTuple<A>, (...values: A) => R]): Observable<R>;
export declare function forkJoin(sourcesObject: {
    [K in any]: never;
}): Observable<never>;
export declare function forkJoin<T extends Record<string, ObservableInput<any>>>(sourcesObject: T): Observable<{
    [K in keyof T]: ObservedValueOf<T[K]>;
}>;
