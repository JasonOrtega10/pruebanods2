import { Observable } from '../Observable';
import { ObservableInput, OperatorFunction } from '../types';
export declare function windowWhen<T>(closingSelector: () => ObservableInput<any>): OperatorFunction<T, Observable<T>>;
