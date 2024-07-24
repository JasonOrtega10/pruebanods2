import { Observable } from '../Observable';
import { ObservableInput, SchedulerLike, ObservedValueOf, ObservableInputTuple } from '../types';
import { Subscriber } from '../Subscriber';
import { AnyCatcher } from '../AnyCatcher';
export declare function combineLatest<T extends AnyCatcher>(arg: T): Observable<unknown>;
export declare function combineLatest(sources: []): Observable<never>;
export declare function combineLatest<A extends readonly unknown[]>(sources: readonly [...ObservableInputTuple<A>]): Observable<A>;
export declare function combineLatest<A extends readonly unknown[], R>(sources: readonly [...ObservableInputTuple<A>], resultSelector: (...values: A) => R, scheduler: SchedulerLike): Observable<R>;
export declare function combineLatest<A extends readonly unknown[], R>(sources: readonly [...ObservableInputTuple<A>], resultSelector: (...values: A) => R): Observable<R>;
export declare function combineLatest<A extends readonly unknown[]>(sources: readonly [...ObservableInputTuple<A>], scheduler: SchedulerLike): Observable<A>;
export declare function combineLatest<A extends readonly unknown[]>(...sources: [...ObservableInputTuple<A>]): Observable<A>;
export declare function combineLatest<A extends readonly unknown[], R>(...sourcesAndResultSelectorAndScheduler: [...ObservableInputTuple<A>, (...values: A) => R, SchedulerLike]): Observable<R>;
export declare function combineLatest<A extends readonly unknown[], R>(...sourcesAndResultSelector: [...ObservableInputTuple<A>, (...values: A) => R]): Observable<R>;
export declare function combineLatest<A extends readonly unknown[]>(...sourcesAndScheduler: [...ObservableInputTuple<A>, SchedulerLike]): Observable<A>;
export declare function combineLatest(sourcesObject: {
    [K in any]: never;
}): Observable<never>;
export declare function combineLatest<T extends Record<string, ObservableInput<any>>>(sourcesObject: T): Observable<{
    [K in keyof T]: ObservedValueOf<T[K]>;
}>;
export declare function combineLatestInit(observables: ObservableInput<any>[], scheduler?: SchedulerLike, valueTransform?: (values: any[]) => any): (subscriber: Subscriber<any>) => void;
