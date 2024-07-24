import { Subscriber } from './Subscriber';
import { ObservableNotification } from './types';
export declare const config: GlobalConfig;
export interface GlobalConfig {
    onUnhandledError: ((err: any) => void) | null;
    onStoppedNotification: ((notification: ObservableNotification<any>, subscriber: Subscriber<any>) => void) | null;
    Promise?: PromiseConstructorLike;
    useDeprecatedSynchronousErrorHandling: boolean;
    useDeprecatedNextContext: boolean;
}
