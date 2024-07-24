import { Observable } from '../Observable';
import { Subscribable } from '../types';
export declare function fromSubscribable<T>(subscribable: Subscribable<T>): Observable<T>;
