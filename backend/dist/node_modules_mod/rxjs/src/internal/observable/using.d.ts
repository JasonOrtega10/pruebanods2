import { Observable } from '../Observable';
import { Unsubscribable, ObservableInput, ObservedValueOf } from '../types';
export declare function using<T extends ObservableInput<any>>(resourceFactory: () => Unsubscribable | void, observableFactory: (resource: Unsubscribable | void) => T | void): Observable<ObservedValueOf<T>>;
