import { Action } from './scheduler/Action';
import { Subscription } from './Subscription';
import { SchedulerLike, SchedulerAction } from './types';
export declare class Scheduler implements SchedulerLike {
    private schedulerActionCtor;
    static now: () => number;
    constructor(schedulerActionCtor: typeof Action, now?: () => number);
    now: () => number;
    schedule<T>(work: (this: SchedulerAction<T>, state?: T) => void, delay?: number, state?: T): Subscription;
}
