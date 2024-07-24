import { OperatorFunction, ObservableInput } from '../types';
export declare function sequenceEqual<T>(compareTo: ObservableInput<T>, comparator?: (a: T, b: T) => boolean): OperatorFunction<T, boolean>;
