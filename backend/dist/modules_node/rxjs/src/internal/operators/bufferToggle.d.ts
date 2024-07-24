import { OperatorFunction, ObservableInput } from '../types';
export declare function bufferToggle<T, O>(openings: ObservableInput<O>, closingSelector: (value: O) => ObservableInput<any>): OperatorFunction<T, T[]>;
