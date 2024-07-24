import { OperatorFunction } from '../types';
export declare function mapTo<R>(value: R): OperatorFunction<unknown, R>;
export declare function mapTo<T, R>(value: R): OperatorFunction<T, R>;
