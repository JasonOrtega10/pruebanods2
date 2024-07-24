import { Observable } from '../../Observable';
import { TimestampProvider } from '../../types';
export declare function animationFrames(timestampProvider?: TimestampProvider): Observable<{
    timestamp: number;
    elapsed: number;
}>;
