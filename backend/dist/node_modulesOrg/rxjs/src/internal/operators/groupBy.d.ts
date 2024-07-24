import { Observable } from '../Observable';
import { Subject } from '../Subject';
import { ObservableInput, OperatorFunction, SubjectLike } from '../types';
export interface BasicGroupByOptions<K, T> {
    element?: undefined;
    duration?: (grouped: GroupedObservable<K, T>) => ObservableInput<any>;
    connector?: () => SubjectLike<T>;
}
export interface GroupByOptionsWithElement<K, E, T> {
    element: (value: T) => E;
    duration?: (grouped: GroupedObservable<K, E>) => ObservableInput<any>;
    connector?: () => SubjectLike<E>;
}
export declare function groupBy<T, K>(key: (value: T) => K, options: BasicGroupByOptions<K, T>): OperatorFunction<T, GroupedObservable<K, T>>;
export declare function groupBy<T, K, E>(key: (value: T) => K, options: GroupByOptionsWithElement<K, E, T>): OperatorFunction<T, GroupedObservable<K, E>>;
export declare function groupBy<T, K extends T>(key: (value: T) => value is K): OperatorFunction<T, GroupedObservable<true, K> | GroupedObservable<false, Exclude<T, K>>>;
export declare function groupBy<T, K>(key: (value: T) => K): OperatorFunction<T, GroupedObservable<K, T>>;
export declare function groupBy<T, K>(key: (value: T) => K, element: void, duration: (grouped: GroupedObservable<K, T>) => Observable<any>): OperatorFunction<T, GroupedObservable<K, T>>;
export declare function groupBy<T, K, R>(key: (value: T) => K, element?: (value: T) => R, duration?: (grouped: GroupedObservable<K, R>) => Observable<any>): OperatorFunction<T, GroupedObservable<K, R>>;
export declare function groupBy<T, K, R>(key: (value: T) => K, element?: (value: T) => R, duration?: (grouped: GroupedObservable<K, R>) => Observable<any>, connector?: () => Subject<R>): OperatorFunction<T, GroupedObservable<K, R>>;
export interface GroupedObservable<K, T> extends Observable<T> {
    readonly key: K;
}
