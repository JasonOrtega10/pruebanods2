import { Observable } from '../Observable';
import { AjaxConfig } from './types';
import { AjaxResponse } from './AjaxResponse';
export interface AjaxCreationMethod {
    <T>(config: AjaxConfig): Observable<AjaxResponse<T>>;
    <T>(url: string): Observable<AjaxResponse<T>>;
    get<T>(url: string, headers?: Record<string, string>): Observable<AjaxResponse<T>>;
    post<T>(url: string, body?: any, headers?: Record<string, string>): Observable<AjaxResponse<T>>;
    put<T>(url: string, body?: any, headers?: Record<string, string>): Observable<AjaxResponse<T>>;
    patch<T>(url: string, body?: any, headers?: Record<string, string>): Observable<AjaxResponse<T>>;
    delete<T>(url: string, headers?: Record<string, string>): Observable<AjaxResponse<T>>;
    getJSON<T>(url: string, headers?: Record<string, string>): Observable<T>;
}
export declare const ajax: AjaxCreationMethod;
export declare function fromAjax<T>(init: AjaxConfig): Observable<AjaxResponse<T>>;
