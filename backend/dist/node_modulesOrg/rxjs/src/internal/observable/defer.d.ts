import { Observable } from '../Observable';
import { ObservedValueOf, ObservableInput } from '../types';
export declare function defer<R extends ObservableInput<any>>(observableFactory: () => R): Observable<ObservedValueOf<R>>;
