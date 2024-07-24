import { Connectable, ObservableInput, SubjectLike } from '../types';
export interface ConnectableConfig<T> {
    connector: () => SubjectLike<T>;
    resetOnDisconnect?: boolean;
}
export declare function connectable<T>(source: ObservableInput<T>, config?: ConnectableConfig<T>): Connectable<T>;
