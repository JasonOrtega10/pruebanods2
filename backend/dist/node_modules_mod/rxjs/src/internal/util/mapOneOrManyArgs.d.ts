import { OperatorFunction } from "../types";
export declare function mapOneOrManyArgs<T, R>(fn: ((...values: T[]) => R)): OperatorFunction<T | T[], R>;
