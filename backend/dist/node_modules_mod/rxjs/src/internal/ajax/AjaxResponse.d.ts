import { AjaxRequest, AjaxResponseType } from './types';
export declare class AjaxResponse<T> {
    readonly originalEvent: ProgressEvent;
    readonly xhr: XMLHttpRequest;
    readonly request: AjaxRequest;
    readonly type: AjaxResponseType;
    readonly status: number;
    readonly response: T;
    readonly responseType: XMLHttpRequestResponseType;
    readonly loaded: number;
    readonly total: number;
    readonly responseHeaders: Record<string, string>;
    constructor(originalEvent: ProgressEvent, xhr: XMLHttpRequest, request: AjaxRequest, type?: AjaxResponseType);
}
