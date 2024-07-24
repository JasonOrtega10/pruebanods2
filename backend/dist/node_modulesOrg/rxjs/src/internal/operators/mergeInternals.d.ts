import { Observable } from '../Observable';
import { Subscriber } from '../Subscriber';
import { ObservableInput, SchedulerLike } from '../types';
export declare function mergeInternals<T, R>(source: Observable<T>, subscriber: Subscriber<R>, project: (value: T, index: number) => ObservableInput<R>, concurrent: number, onBeforeNext?: (innerValue: R) => void, expand?: boolean, innerSubScheduler?: SchedulerLike, additionalFinalizer?: () => void): () => void;
