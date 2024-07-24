import { OperatorFunction } from '../types';
export declare function map<T, R>(project: (value: T, index: number) => R): OperatorFunction<T, R>;
export declare function map<T, R, A>(project: (this: A, value: T, index: number) => R, thisArg: A): OperatorFunction<T, R>;
