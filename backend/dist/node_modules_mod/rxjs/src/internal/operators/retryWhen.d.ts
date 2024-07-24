import { Observable } from '../Observable';
import { MonoTypeOperatorFunction, ObservableInput } from '../types';
export declare function retryWhen<T>(notifier: (errors: Observable<any>) => ObservableInput<any>): MonoTypeOperatorFunction<T>;
