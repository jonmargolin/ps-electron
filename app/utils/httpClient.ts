import { ajax, AjaxRequest, AjaxResponse } from 'rxjs/ajax';
import { Observable, fromEvent, Subscriber } from 'rxjs';

export interface HttpRequest {
    path: string;
    method: 'GET' | 'POST';
    body?: any;
    options?: any;
    progress$?: Subscriber<ProgressEvent>;
}

export class HttpClient {
    get(path:string, options?: any, progress$?: Subscriber<ProgressEvent>) {
        return this.request({path, method: 'GET', options, progress$});
    };

    post(path:string, body?: any, options?: any, progress$?: Subscriber<ProgressEvent>) {
        return this.request({path, method: 'POST', body, options, progress$});
    };

    request({path, method, body, options, progress$}: HttpRequest): Observable<AjaxResponse> {
        const auth = toBase64(`test:test1234`);
        
        const xhr = new XMLHttpRequest();
        const getRequest = () => xhr;
        if (progress$)
            fromEvent<ProgressEvent>(xhr, 'progress').subscribe(progress$)
        
        const request: AjaxRequest = {
            url: path,
            method,
            headers:{
                Authorization: `Basic ${auth}`
            },
            createXHR: getRequest,
            body,
            ...options
        };

        return ajax(request);
    }
}

function toBase64 (str: string) {
    return Buffer.from(str || '', 'utf8').toString('base64')
}