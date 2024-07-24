import { AjaxRequest } from './types';
export interface AjaxError extends Error {
    xhr: XMLHttpRequest;
    request: AjaxRequest;
    status: number;
    responseType: XMLHttpRequestResponseType;
    response: any;
}
export interface AjaxErrorCtor {
    new (message: string, xhr: XMLHttpRequest, request: AjaxRequest): AjaxError;
}
export declare const AjaxError: AjaxErrorCtor;
export interface AjaxTimeoutError extends AjaxError {
}
export interface AjaxTimeoutErrorCtor {
    new (xhr: XMLHttpRequest, request: AjaxRequest): AjaxTimeoutError;
}
export declare const AjaxTimeoutError: AjaxTimeoutErrorCtor;
