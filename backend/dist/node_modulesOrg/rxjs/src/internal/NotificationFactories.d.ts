import { CompleteNotification, NextNotification, ErrorNotification } from './types';
export declare const COMPLETE_NOTIFICATION: CompleteNotification;
export declare function errorNotification(error: any): ErrorNotification;
export declare function nextNotification<T>(value: T): NextNotification<T>;
export declare function createNotification(kind: 'N' | 'E' | 'C', value: any, error: any): {
    kind: "E" | "N" | "C";
    value: any;
    error: any;
};
