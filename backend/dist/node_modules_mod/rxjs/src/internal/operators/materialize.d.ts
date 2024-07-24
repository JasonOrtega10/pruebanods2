import { Notification } from '../Notification';
import { OperatorFunction, ObservableNotification } from '../types';
export declare function materialize<T>(): OperatorFunction<T, Notification<T> & ObservableNotification<T>>;
