import * as React from "react";
import ProgressBar, { ProgressText } from '../../components/ui/progress-bar/progress-bar';
import { HttpClient } from '../../utils/httpClient';
import { AjaxResponse } from 'rxjs/ajax';
import Button from '../../components/ui/button/button';

export interface FilePath {
    file: string;
    path: string;
    url: string;
}

export interface IInstallerProps {
    filePaths:FilePath[];
}

export interface IInstallerState {
    filePaths:FilePath[];
    progress: number;
    progressText: ProgressText;
    isDone: boolean;
}

export class InstallerPage extends React.Component<IInstallerProps, IInstallerState> {
    http: HttpClient = new HttpClient();
    constructor(readonly props: IInstallerProps) {
        super(props);
        this.state = {
            filePaths: props.filePaths,
            progress: 0,
            progressText: ProgressText.Initializing,
            isDone: false
        }

        this.fetchFiles();
    }

    fetchFiles() {
        const filePaths = this.state.filePaths;
        if (!filePaths || filePaths.length === 0) return;        
        // download all the files from filePaths
        filePaths.forEach(
            filePath => {
                const response = this.http.get(filePath.url, {responseType: 'blob'});
                const logProgress = (loaded: number, total: number) => {
                    console.log(`file: ${filePath.file} - ${loaded.toLocaleString()}/${total.toLocaleString()}`, `${(loaded * 100 / total).toLocaleString()}%`)
                }
                // subscribe to progress of current iteration
                response.progress$.subscribe(
                    next => logProgress(next.loaded, next.total),
                    (err: any) => console.log('err ' + filePath.file, err),
                    () => console.log('done ' + filePath.file)
                )

                // subscribe to the response of current iteration
                response.response$.subscribe(
                    (res: AjaxResponse) => console.log('res ' + filePath.file, res),
                    (err: any) => console.log('suberr ' + filePath.file, err)
                );
            }
        );
    }

    setProgressText(progressText: ProgressText) {
        if (!progressText) return;
        this.setState({
            progressText
        });
    }

    setProgress(progress: number) {
        this.setState({
            progress
        });
    }

    setIsDone(isDone: boolean) {
        this.setState({
            progressText: ProgressText.Finalizing,
            isDone
        });
    }

    // save stream tmp
    // extract the files to correct folder
    // remove all temp files
    // validate installation and remove temp files
    // show button

    onNext = () => {
        // navigate to finish page
    }

    onDone = () => {
        this.setIsDone(true);
    }

    render() {
        return (
            <>  
                {
                    this.state.isDone 
                        ? <Button clicked={this.onNext} /> 
                        : <ProgressBar progress={this.state.progress} onDone={this.onDone} progressText={this.state.progressText} />
                }
            </>
        );
    }
}