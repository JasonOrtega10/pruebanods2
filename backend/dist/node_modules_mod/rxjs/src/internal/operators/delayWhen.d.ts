import { Observable } from '../Observable';
import { MonoTypeOperatorFunction, ObservableInput } from '../types';
export declare function delayWhen<T>(delayDurationSelector: (value: T, index: number) => ObservableInput<any>, subscriptionDelay: Observable<any>): MonoTypeOperatorFunction<T>;
export declare function delayWhen<T>(delayDurationSelector: (value: T, index: number) => ObservableInput<any>): MonoTypeOperatorFunction<T>;
