import { Operator } from './Operator';
import { Observable } from './Observable';
import { Subscriber } from './Subscriber';
import { Subscription } from './Subscription';
import { Observer, SubscriptionLike, TeardownLogic } from './types';
export declare class Subject<T> extends Observable<T> implements SubscriptionLike {
    closed: boolean;
    private currentObservers;
    observers: Observer<T>[];
    isStopped: boolean;
    hasError: boolean;
    thrownError: any;
    static create: (...args: any[]) => any;
    constructor();
    lift<R>(operator: Operator<T, R>): Observable<R>;
    protected _throwIfClosed(): void;
    next(value: T): void;
    error(err: any): void;
    complete(): void;
    unsubscribe(): void;
    get observed(): boolean;
    protected _trySubscribe(subscriber: Subscriber<T>): TeardownLogic;
    protected _subscribe(subscriber: Subscriber<T>): Subscription;
    protected _innerSubscribe(subscriber: Subscriber<any>): Subscription;
    protected _checkFinalizedStatuses(subscriber: Subscriber<any>): void;
    asObservable(): Observable<T>;
}
export declare class AnonymousSubject<T> extends Subject<T> {
    destination?: Observer<T>;
    constructor(destination?: Observer<T>, source?: Observable<T>);
    next(value: T): void;
    error(err: any): void;
    complete(): void;
    protected _subscribe(subscriber: Subscriber<T>): Subscription;
}
