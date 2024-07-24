import { Observer } from './types';
import { Subscription } from './Subscription';
export declare class Subscriber<T> extends Subscription implements Observer<T> {
    static create<T>(next?: (x?: T) => void, error?: (e?: any) => void, complete?: () => void): Subscriber<T>;
    protected isStopped: boolean;
    protected destination: Subscriber<any> | Observer<any>;
    constructor(destination?: Subscriber<any> | Observer<any>);
    next(value?: T): void;
    error(err?: any): void;
    complete(): void;
    unsubscribe(): void;
    protected _next(value: T): void;
    protected _error(err: any): void;
    protected _complete(): void;
}
export declare class SafeSubscriber<T> extends Subscriber<T> {
    constructor(observerOrNext?: Partial<Observer<T>> | ((value: T) => void) | null, error?: ((e?: any) => void) | null, complete?: (() => void) | null);
}
export declare const EMPTY_OBSERVER: Readonly<Observer<any>> & {
    closed: true;
};
