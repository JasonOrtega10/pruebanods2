import { Subject } from './Subject';
import { Subscriber } from './Subscriber';
export declare class AsyncSubject<T> extends Subject<T> {
    private _value;
    private _hasValue;
    private _isComplete;
    protected _checkFinalizedStatuses(subscriber: Subscriber<T>): void;
    next(value: T): void;
    complete(): void;
}
