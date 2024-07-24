import { OperatorFunction } from '../types';
export declare function count<T>(predicate?: (value: T, index: number) => boolean): OperatorFunction<T, number>;
