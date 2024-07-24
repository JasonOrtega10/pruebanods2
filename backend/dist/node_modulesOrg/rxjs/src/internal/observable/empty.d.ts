import { Observable } from '../Observable';
import { SchedulerLike } from '../types';
export declare const EMPTY: Observable<never>;
export declare function empty(scheduler?: SchedulerLike): Observable<never>;
