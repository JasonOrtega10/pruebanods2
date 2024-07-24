import { ObservableInputTuple, OperatorFunction, Cons } from '../types';
export declare function combineLatestWith<T, A extends readonly unknown[]>(...otherSources: [...ObservableInputTuple<A>]): OperatorFunction<T, Cons<T, A>>;
