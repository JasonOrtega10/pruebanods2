import { OperatorFunction, TimestampProvider, Timestamp } from '../types';
export declare function timestamp<T>(timestampProvider?: TimestampProvider): OperatorFunction<T, Timestamp<T>>;
