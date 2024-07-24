import { AsyncAction } from './AsyncAction';
import { Subscription } from '../Subscription';
import { AsyncScheduler } from './AsyncScheduler';
import { SchedulerAction } from '../types';
import { TimerHandle } from './timerHandle';
export declare class VirtualTimeScheduler extends AsyncScheduler {
    maxFrames: number;
    static frameTimeFactor: number;
    frame: number;
    index: number;
    constructor(schedulerActionCtor?: typeof AsyncAction, maxFrames?: number);
    flush(): void;
}
export declare class VirtualAction<T> extends AsyncAction<T> {
    protected scheduler: VirtualTimeScheduler;
    protected work: (this: SchedulerAction<T>, state?: T) => void;
    protected index: number;
    protected active: boolean;
    constructor(scheduler: VirtualTimeScheduler, work: (this: SchedulerAction<T>, state?: T) => void, index?: number);
    schedule(state?: T, delay?: number): Subscription;
    protected requestAsyncId(scheduler: VirtualTimeScheduler, id?: any, delay?: number): TimerHandle;
    protected recycleAsyncId(scheduler: VirtualTimeScheduler, id?: any, delay?: number): TimerHandle | undefined;
    protected _execute(state: T, delay: number): any;
    private static sortActions;
}
