import { OperatorFunction, ObservableInput } from '../types';
export declare function buffer<T>(closingNotifier: ObservableInput<any>): OperatorFunction<T, T[]>;
