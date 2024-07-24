import { Observable } from '../Observable';
import { ObservableInput } from '../types';
export declare function joinAllInternals<T, R>(joinFn: (sources: ObservableInput<T>[]) => Observable<T>, project?: (...args: any[]) => R): import("../types").UnaryFunction<Observable<ObservableInput<T>>, unknown>;
