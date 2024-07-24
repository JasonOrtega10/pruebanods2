import { ObservableInput } from '../types';
import { Observable } from '../Observable';
export declare function partition<T, U extends T, A>(source: ObservableInput<T>, predicate: (this: A, value: T, index: number) => value is U, thisArg: A): [Observable<U>, Observable<Exclude<T, U>>];
export declare function partition<T, U extends T>(source: ObservableInput<T>, predicate: (value: T, index: number) => value is U): [Observable<U>, Observable<Exclude<T, U>>];
export declare function partition<T, A>(source: ObservableInput<T>, predicate: (this: A, value: T, index: number) => boolean, thisArg: A): [Observable<T>, Observable<T>];
export declare function partition<T>(source: ObservableInput<T>, predicate: (value: T, index: number) => boolean): [Observable<T>, Observable<T>];
