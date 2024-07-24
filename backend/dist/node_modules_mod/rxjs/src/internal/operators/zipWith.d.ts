import { ObservableInputTuple, OperatorFunction, Cons } from '../types';
export declare function zipWith<T, A extends readonly unknown[]>(...otherInputs: [...ObservableInputTuple<A>]): OperatorFunction<T, Cons<T, A>>;
