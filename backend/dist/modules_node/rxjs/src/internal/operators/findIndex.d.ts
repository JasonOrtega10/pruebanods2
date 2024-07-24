import { Observable } from '../Observable';
import { Falsy, OperatorFunction } from '../types';
export declare function findIndex<T>(predicate: BooleanConstructor): OperatorFunction<T, T extends Falsy ? -1 : number>;
export declare function findIndex<T>(predicate: BooleanConstructor, thisArg: any): OperatorFunction<T, T extends Falsy ? -1 : number>;
export declare function findIndex<T, A>(predicate: (this: A, value: T, index: number, source: Observable<T>) => boolean, thisArg: A): OperatorFunction<T, number>;
export declare function findIndex<T>(predicate: (value: T, index: number, source: Observable<T>) => boolean): OperatorFunction<T, number>;
