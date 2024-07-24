import { Observable } from '../Observable';
import { ObservableInput, ObservableInputTuple } from '../types';
import { Subscriber } from '../Subscriber';
export declare function race<T extends readonly unknown[]>(inputs: [...ObservableInputTuple<T>]): Observable<T[number]>;
export declare function race<T extends readonly unknown[]>(...inputs: [...ObservableInputTuple<T>]): Observable<T[number]>;
export declare function raceInit<T>(sources: ObservableInput<T>[]): (subscriber: Subscriber<T>) => void;
