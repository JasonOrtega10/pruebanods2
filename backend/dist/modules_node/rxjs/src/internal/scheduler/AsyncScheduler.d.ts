import { Scheduler } from '../Scheduler';
import { Action } from './Action';
import { AsyncAction } from './AsyncAction';
import { TimerHandle } from './timerHandle';
export declare class AsyncScheduler extends Scheduler {
    actions: Array<AsyncAction<any>>;
    _active: boolean;
    _scheduled: TimerHandle | undefined;
    constructor(SchedulerAction: typeof Action, now?: () => number);
    flush(action: AsyncAction<any>): void;
}
