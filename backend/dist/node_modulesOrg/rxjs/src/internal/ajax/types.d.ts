import { PartialObserver } from '../types';
export type AjaxDirection = 'upload' | 'download';
export type ProgressEventType = 'loadstart' | 'progress' | 'load';
export type AjaxResponseType = `${AjaxDirection}_${ProgressEventType}`;
export interface AjaxRequest {
    url: string;
    body?: any;
    method: string;
    async: boolean;
    headers: Readonly<Record<string, any>>;
    timeout: number;
    user?: string;
    password?: string;
    crossDomain: boolean;
    withCredentials: boolean;
    responseType: XMLHttpRequestResponseType;
}
export interface AjaxConfig {
    url: string;
    body?: any;
    async?: boolean;
    method?: string;
    headers?: Readonly<Record<string, any>>;
    timeout?: number;
    user?: string;
    password?: string;
    crossDomain?: boolean;
    withCredentials?: boolean;
    xsrfCookieName?: string;
    xsrfHeaderName?: string;
    responseType?: XMLHttpRequestResponseType;
    createXHR?: () => XMLHttpRequest;
    progressSubscriber?: PartialObserver<ProgressEvent>;
    includeDownloadProgress?: boolean;
    includeUploadProgress?: boolean;
    queryParams?: string | URLSearchParams | Record<string, string | number | boolean | string[] | number[] | boolean[]> | [string, string | number | boolean | string[] | number[] | boolean[]][];
}
