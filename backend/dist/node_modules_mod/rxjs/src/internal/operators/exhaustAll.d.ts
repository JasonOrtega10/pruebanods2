import { OperatorFunction, ObservableInput, ObservedValueOf } from '../types';
export declare function exhaustAll<O extends ObservableInput<any>>(): OperatorFunction<O, ObservedValueOf<O>>;
