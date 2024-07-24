import { ObservableInput, OperatorFunction } from '../types';
export declare function bufferWhen<T>(closingSelector: () => ObservableInput<any>): OperatorFunction<T, T[]>;
