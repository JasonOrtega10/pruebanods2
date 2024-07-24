import { Subscriber } from '../Subscriber';
export declare function createOperatorSubscriber<T>(destination: Subscriber<any>, onNext?: (value: T) => void, onComplete?: () => void, onError?: (err: any) => void, onFinalize?: () => void): Subscriber<T>;
export declare class OperatorSubscriber<T> extends Subscriber<T> {
    private onFinalize?;
    private shouldUnsubscribe?;
    constructor(destination: Subscriber<any>, onNext?: (value: T) => void, onComplete?: () => void, onError?: (err: any) => void, onFinalize?: () => void, shouldUnsubscribe?: () => boolean);
    unsubscribe(): void;
}
