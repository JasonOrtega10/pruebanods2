import { MonoTypeOperatorFunction, ObservableInput } from '../types';
export declare function distinct<T, K>(keySelector?: (value: T) => K, flushes?: ObservableInput<any>): MonoTypeOperatorFunction<T>;
