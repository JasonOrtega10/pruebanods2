import { ObservableInputTuple, OperatorFunction, Cons } from '../types';
export declare function zip<T, A extends readonly unknown[]>(otherInputs: [...ObservableInputTuple<A>]): OperatorFunction<T, Cons<T, A>>;
export declare function zip<T, A extends readonly unknown[], R>(otherInputsAndProject: [...ObservableInputTuple<A>], project: (...values: Cons<T, A>) => R): OperatorFunction<T, R>;
export declare function zip<T, A extends readonly unknown[]>(...otherInputs: [...ObservableInputTuple<A>]): OperatorFunction<T, Cons<T, A>>;
export declare function zip<T, A extends readonly unknown[], R>(...otherInputsAndProject: [...ObservableInputTuple<A>, (...values: Cons<T, A>) => R]): OperatorFunction<T, R>;
