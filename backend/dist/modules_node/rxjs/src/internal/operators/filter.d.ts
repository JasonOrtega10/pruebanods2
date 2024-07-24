import { OperatorFunction, MonoTypeOperatorFunction, TruthyTypesOf } from '../types';
export declare function filter<T, S extends T, A>(predicate: (this: A, value: T, index: number) => value is S, thisArg: A): OperatorFunction<T, S>;
export declare function filter<T, S extends T>(predicate: (value: T, index: number) => value is S): OperatorFunction<T, S>;
export declare function filter<T>(predicate: BooleanConstructor): OperatorFunction<T, TruthyTypesOf<T>>;
export declare function filter<T, A>(predicate: (this: A, value: T, index: number) => boolean, thisArg: A): MonoTypeOperatorFunction<T>;
export declare function filter<T>(predicate: (value: T, index: number) => boolean): MonoTypeOperatorFunction<T>;
