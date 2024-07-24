import { OperatorFunction } from '../types';
export declare function bufferCount<T>(bufferSize: number, startBufferEvery?: number | null): OperatorFunction<T, T[]>;
