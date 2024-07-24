import { SchedulerLike } from '../types';
import { Observable } from '../Observable';
export declare function range(start: number, count?: number): Observable<number>;
export declare function range(start: number, count: number | undefined, scheduler: SchedulerLike): Observable<number>;
