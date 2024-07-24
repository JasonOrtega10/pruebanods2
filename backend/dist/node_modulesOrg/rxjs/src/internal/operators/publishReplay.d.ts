import { Observable } from '../Observable';
import { MonoTypeOperatorFunction, OperatorFunction, TimestampProvider, ObservableInput, ObservedValueOf } from '../types';
export declare function publishReplay<T>(bufferSize?: number, windowTime?: number, timestampProvider?: TimestampProvider): MonoTypeOperatorFunction<T>;
export declare function publishReplay<T, O extends ObservableInput<any>>(bufferSize: number | undefined, windowTime: number | undefined, selector: (shared: Observable<T>) => O, timestampProvider?: TimestampProvider): OperatorFunction<T, ObservedValueOf<O>>;
export declare function publishReplay<T, O extends ObservableInput<any>>(bufferSize: number | undefined, windowTime: number | undefined, selector: undefined, timestampProvider: TimestampProvider): OperatorFunction<T, ObservedValueOf<O>>;
