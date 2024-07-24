import { ObservableInput, SchedulerLike } from '../types';
import { Observable } from '../Observable';
export declare function scheduled<T>(input: ObservableInput<T>, scheduler: SchedulerLike): Observable<T>;
