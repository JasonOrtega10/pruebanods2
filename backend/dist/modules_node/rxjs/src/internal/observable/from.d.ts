import { Observable } from '../Observable';
import { ObservableInput, SchedulerLike, ObservedValueOf } from '../types';
export declare function from<O extends ObservableInput<any>>(input: O): Observable<ObservedValueOf<O>>;
export declare function from<O extends ObservableInput<any>>(input: O, scheduler: SchedulerLike | undefined): Observable<ObservedValueOf<O>>;
