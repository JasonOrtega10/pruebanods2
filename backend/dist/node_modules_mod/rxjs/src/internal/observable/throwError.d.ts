import { Observable } from '../Observable';
import { SchedulerLike } from '../types';
export declare function throwError(errorFactory: () => any): Observable<never>;
export declare function throwError(error: any): Observable<never>;
export declare function throwError(errorOrErrorFactory: any, scheduler: SchedulerLike): Observable<never>;
