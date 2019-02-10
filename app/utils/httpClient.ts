import { ajax, AjaxRequest, AjaxResponse } from 'rxjs/ajax';
import { Observable, fromEvent } from 'rxjs';

export interface HttpResponse {
    response$: Observable<AjaxResponse>;
    progress$: Observable<ProgressEvent>; 
}

export class HttpClient {
    get(path:string, options?: any) {
        return this.request(path, 'GET', null, options);
    };

    post(path:string, body?: any, options?: any) {
        return this.request(path, 'POST', body, options);
    };

    request(path: string, method: 'GET' | 'POST', body?: any, options?: any): HttpResponse {
        const auth = toBase64(`test:test1234`);
        const xhr = new XMLHttpRequest();
        const getRequest = () => xhr;
        const progress = fromEvent<ProgressEvent>(xhr, 'progress');
        
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

        return {
            response$: ajax(request),
            progress$: progress
        };
    }
}

function toBase64 (str: string) {
    return Buffer.from(str || '', 'utf8').toString('base64')
}