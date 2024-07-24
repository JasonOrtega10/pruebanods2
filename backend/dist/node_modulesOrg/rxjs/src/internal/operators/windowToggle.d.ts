import { Observable } from '../Observable';
import { ObservableInput, OperatorFunction } from '../types';
export declare function windowToggle<T, O>(openings: ObservableInput<O>, closingSelector: (openValue: O) => ObservableInput<any>): OperatorFunction<T, Observable<T>>;
