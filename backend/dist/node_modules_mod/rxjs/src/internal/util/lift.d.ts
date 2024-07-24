import { Observable } from '../Observable';
import { Subscriber } from '../Subscriber';
import { OperatorFunction } from '../types';
export declare function hasLift(source: any): source is {
    lift: InstanceType<typeof Observable>['lift'];
};
export declare function operate<T, R>(init: (liftedSource: Observable<T>, subscriber: Subscriber<R>) => (() => void) | void): OperatorFunction<T, R>;
