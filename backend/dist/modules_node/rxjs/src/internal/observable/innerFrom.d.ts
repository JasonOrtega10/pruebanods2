import { Observable } from '../Observable';
import { ObservableInput, ObservedValueOf, ReadableStreamLike } from '../types';
export declare function innerFrom<O extends ObservableInput<any>>(input: O): Observable<ObservedValueOf<O>>;
export declare function fromInteropObservable<T>(obj: any): Observable<T>;
export declare function fromArrayLike<T>(array: ArrayLike<T>): Observable<T>;
export declare function fromPromise<T>(promise: PromiseLike<T>): Observable<T>;
export declare function fromIterable<T>(iterable: Iterable<T>): Observable<T>;
export declare function fromAsyncIterable<T>(asyncIterable: AsyncIterable<T>): Observable<T>;
export declare function fromReadableStreamLike<T>(readableStream: ReadableStreamLike<T>): Observable<T>;
