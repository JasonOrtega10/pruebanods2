import { Observable } from '../Observable';
import { ColdObservable } from './ColdObservable';
import { HotObservable } from './HotObservable';
import { TestMessage } from './TestMessage';
import { SubscriptionLog } from './SubscriptionLog';
import { VirtualTimeScheduler } from '../scheduler/VirtualTimeScheduler';
export interface RunHelpers {
    cold: typeof TestScheduler.prototype.createColdObservable;
    hot: typeof TestScheduler.prototype.createHotObservable;
    flush: typeof TestScheduler.prototype.flush;
    time: typeof TestScheduler.prototype.createTime;
    expectObservable: typeof TestScheduler.prototype.expectObservable;
    expectSubscriptions: typeof TestScheduler.prototype.expectSubscriptions;
    animate: (marbles: string) => void;
}
export type observableToBeFn = (marbles: string, values?: any, errorValue?: any) => void;
export type subscriptionLogsToBeFn = (marbles: string | string[]) => void;
export declare class TestScheduler extends VirtualTimeScheduler {
    assertDeepEqual: (actual: any, expected: any) => boolean | void;
    static frameTimeFactor: number;
    readonly hotObservables: HotObservable<any>[];
    readonly coldObservables: ColdObservable<any>[];
    private flushTests;
    private runMode;
    constructor(assertDeepEqual: (actual: any, expected: any) => boolean | void);
    createTime(marbles: string): number;
    createColdObservable<T = string>(marbles: string, values?: {
        [marble: string]: T;
    }, error?: any): ColdObservable<T>;
    createHotObservable<T = string>(marbles: string, values?: {
        [marble: string]: T;
    }, error?: any): HotObservable<T>;
    private materializeInnerObservable;
    expectObservable<T>(observable: Observable<T>, subscriptionMarbles?: string | null): {
        toBe(marbles: string, values?: any, errorValue?: any): void;
        toEqual: (other: Observable<T>) => void;
    };
    expectSubscriptions(actualSubscriptionLogs: SubscriptionLog[]): {
        toBe: subscriptionLogsToBeFn;
    };
    flush(): void;
    static parseMarblesAsSubscriptions(marbles: string | null, runMode?: boolean): SubscriptionLog;
    static parseMarbles(marbles: string, values?: any, errorValue?: any, materializeInnerObservables?: boolean, runMode?: boolean): TestMessage[];
    private createAnimator;
    private createDelegates;
    run<T>(callback: (helpers: RunHelpers) => T): T;
}
