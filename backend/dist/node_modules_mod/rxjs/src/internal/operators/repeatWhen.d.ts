import { Observable } from '../Observable';
import { MonoTypeOperatorFunction, ObservableInput } from '../types';
export declare function repeatWhen<T>(notifier: (notifications: Observable<void>) => ObservableInput<any>): MonoTypeOperatorFunction<T>;
