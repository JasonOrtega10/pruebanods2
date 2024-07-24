import { Observable } from '../Observable';
import { OperatorFunction, ObservableInput } from '../types';
export declare function window<T>(windowBoundaries: ObservableInput<any>): OperatorFunction<T, Observable<T>>;
