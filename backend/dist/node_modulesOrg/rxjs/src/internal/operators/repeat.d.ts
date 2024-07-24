import { MonoTypeOperatorFunction, ObservableInput } from '../types';
export interface RepeatConfig {
    count?: number;
    delay?: number | ((count: number) => ObservableInput<any>);
}
export declare function repeat<T>(countOrConfig?: number | RepeatConfig): MonoTypeOperatorFunction<T>;
