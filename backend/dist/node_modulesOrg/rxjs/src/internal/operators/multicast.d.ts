import { Subject } from '../Subject';
import { Observable } from '../Observable';
import { ConnectableObservable } from '../observable/ConnectableObservable';
import { OperatorFunction, UnaryFunction, ObservedValueOf, ObservableInput } from '../types';
export declare function multicast<T>(subject: Subject<T>): UnaryFunction<Observable<T>, ConnectableObservable<T>>;
export declare function multicast<T, O extends ObservableInput<any>>(subject: Subject<T>, selector: (shared: Observable<T>) => O): OperatorFunction<T, ObservedValueOf<O>>;
export declare function multicast<T>(subjectFactory: () => Subject<T>): UnaryFunction<Observable<T>, ConnectableObservable<T>>;
export declare function multicast<T, O extends ObservableInput<any>>(subjectFactory: () => Subject<T>, selector: (shared: Observable<T>) => O): OperatorFunction<T, ObservedValueOf<O>>;
