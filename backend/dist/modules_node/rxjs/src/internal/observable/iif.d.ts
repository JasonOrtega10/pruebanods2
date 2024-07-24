import { Observable } from '../Observable';
import { ObservableInput } from '../types';
export declare function iif<T, F>(condition: () => boolean, trueResult: ObservableInput<T>, falseResult: ObservableInput<F>): Observable<T | F>;
