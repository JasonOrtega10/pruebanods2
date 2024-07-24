import { Observable } from '../Observable';
import { Subscriber } from '../Subscriber';
export declare function scanInternals<V, A, S>(accumulator: (acc: V | A | S, value: V, index: number) => A, seed: S, hasSeed: boolean, emitOnNext: boolean, emitBeforeComplete?: undefined | true): (source: Observable<V>, subscriber: Subscriber<any>) => void;
