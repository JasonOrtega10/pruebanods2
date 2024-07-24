import { Subject } from './Subject';
import { TimestampProvider } from './types';
import { Subscriber } from './Subscriber';
import { Subscription } from './Subscription';
export declare class ReplaySubject<T> extends Subject<T> {
    private _bufferSize;
    private _windowTime;
    private _timestampProvider;
    private _buffer;
    private _infiniteTimeWindow;
    constructor(_bufferSize?: number, _windowTime?: number, _timestampProvider?: TimestampProvider);
    next(value: T): void;
    protected _subscribe(subscriber: Subscriber<T>): Subscription;
    private _trimBuffer;
}
