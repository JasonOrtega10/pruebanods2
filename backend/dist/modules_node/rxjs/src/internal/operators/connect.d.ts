import { OperatorFunction, ObservableInput, ObservedValueOf, SubjectLike } from '../types';
import { Observable } from '../Observable';
export interface ConnectConfig<T> {
    connector: () => SubjectLike<T>;
}
export declare function connect<T, O extends ObservableInput<unknown>>(selector: (shared: Observable<T>) => O, config?: ConnectConfig<T>): OperatorFunction<T, ObservedValueOf<O>>;
