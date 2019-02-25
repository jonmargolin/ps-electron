import { HttpClient } from '../../utils/httpClient';
import { FilePath } from './installerPage';
import { from, Subscriber, EMPTY } from 'rxjs';
import { concatMap, delay, map, catchError, ignoreElements } from 'rxjs/operators';

export class InstallerHelper {
    private _http = new HttpClient();

    constructor() {}

    public fetchFiles(filePaths: FilePath[]) {
        if (!filePaths || filePaths.length === 0) return;

        const progress = new Subscriber<ProgressEvent>(
            next => this.handleProgress(next)
        );
        console.log(`%c*** START DOWNLOADING ***`, 'font-size: 2em; color: navy; font-weight: bold;');
        from(filePaths).pipe(
            concatMap(filePath => {
                console.log(`%c*** START - ${filePath.file} ***`, 'font-size: 1.5em; color: blue; font-weight: bold;');
                return this._http.get(filePath.url, {responseType: 'blob'}, progress).pipe(
                    // FIXME: remove delay 
                    delay(1000),
                    map(res => {return {res, filePath}}),
                    // FIXME: remove the catch error to prevent from keep going with download on error event
                    catchError(err => {
                        console.log(`%c*** ERROR - ${err} ***`, 'font-size: 1.5em; color: red; font-weight: bold;');
                        return EMPTY.pipe(ignoreElements());
                    })
                );
            }),
            map(({res, filePath}, i) => {
                // save stream tmp
                const data = new FormData();
                data.set('a', res.response as Blob, filePath.file);
                return data.get('a') as File;
            })
        ).subscribe(
            res => console.log(`%c*** DONE DOWNLOADING FILE - ${res.name} ***`, 'font-size: 1.5em; color: green; font-weight: bold;'),
            () => {},
            () => console.log(`%c*** DONE DOWNLOADING ***`, 'font-size: 2em; color: gold; font-weight: bold;')
        );
    }
    
    private handleProgress(e: ProgressEvent) {
        console.log(`%cProgress: ${(e.loaded * 100 / e.total).toLocaleString()}%`, 'font-size: 1.05em; color: purple;')
    }
}