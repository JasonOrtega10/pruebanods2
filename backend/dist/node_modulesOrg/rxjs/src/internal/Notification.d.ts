import { PartialObserver, ObservableNotification, CompleteNotification, NextNotification, ErrorNotification } from './types';
import { Observable } from './Observable';
export declare enum NotificationKind {
    NEXT = "N",
    ERROR = "E",
    COMPLETE = "C"
}
export declare class Notification<T> {
    readonly kind: 'N' | 'E' | 'C';
    readonly value?: T;
    readonly error?: any;
    readonly hasValue: boolean;
    constructor(kind: 'N', value?: T);
    constructor(kind: 'E', value: undefined, error: any);
    constructor(kind: 'C');
    observe(observer: PartialObserver<T>): void;
    do(next: (value: T) => void, error: (err: any) => void, complete: () => void): void;
    do(next: (value: T) => void, error: (err: any) => void): void;
    do(next: (value: T) => void): void;
    accept(next: (value: T) => void, error: (err: any) => void, complete: () => void): void;
    accept(next: (value: T) => void, error: (err: any) => void): void;
    accept(next: (value: T) => void): void;
    accept(observer: PartialObserver<T>): void;
    toObservable(): Observable<T>;
    private static completeNotification;
    static createNext<T>(value: T): Notification<T> & NextNotification<T>;
    static createError(err?: any): Notification<never> & ErrorNotification;
    static createComplete(): Notification<never> & CompleteNotification;
}
export declare function observeNotification<T>(notification: ObservableNotification<T>, observer: PartialObserver<T>): void;
