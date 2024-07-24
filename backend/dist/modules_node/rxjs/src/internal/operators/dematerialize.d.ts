import { OperatorFunction, ObservableNotification, ValueFromNotification } from '../types';
export declare function dematerialize<N extends ObservableNotification<any>>(): OperatorFunction<N, ValueFromNotification<N>>;
