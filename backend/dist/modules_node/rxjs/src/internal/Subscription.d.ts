import { SubscriptionLike, TeardownLogic } from './types';
export declare class Subscription implements SubscriptionLike {
    private initialTeardown?;
    static EMPTY: Subscription;
    closed: boolean;
    private _parentage;
    private _finalizers;
    constructor(initialTeardown?: () => void);
    unsubscribe(): void;
    add(teardown: TeardownLogic): void;
    private _hasParent;
    private _addParent;
    private _removeParent;
    remove(teardown: Exclude<TeardownLogic, void>): void;
}
export declare const EMPTY_SUBSCRIPTION: Subscription;
export declare function isSubscription(value: any): value is Subscription;
