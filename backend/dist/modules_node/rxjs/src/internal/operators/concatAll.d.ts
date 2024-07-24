import { OperatorFunction, ObservableInput, ObservedValueOf } from '../types';
export declare function concatAll<O extends ObservableInput<any>>(): OperatorFunction<O, ObservedValueOf<O>>;
