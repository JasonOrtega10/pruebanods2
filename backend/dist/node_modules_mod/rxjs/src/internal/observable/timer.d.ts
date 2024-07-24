import { Observable } from '../Observable';
import { SchedulerLike } from '../types';
export declare function timer(due: number | Date, scheduler?: SchedulerLike): Observable<0>;
export declare function timer(startDue: number | Date, intervalDuration: number, scheduler?: SchedulerLike): Observable<number>;
export declare function timer(dueTime: number | Date, unused: undefined, scheduler?: SchedulerLike): Observable<0>;
