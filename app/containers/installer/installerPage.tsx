import * as React from "react";
import ProgressBar, { ProgressText } from '../../components/ui/progress-bar/progress-bar';
import Button from '../../components/ui/button/button';
import {EMPTY} from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {switchMap, catchError, ignoreElements } from 'rxjs/operators';
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
        if (!this.state.filePaths || this.state.filePaths.length === 0) return;
        
        // download all the files from this.state.filePaths
        this.state.filePaths.map(
            filePath => ajax({
                url: encodeURI(filePath.url),
                method: 'GET',
                responseType: 'stream'
            }).pipe(
                switchMap((res) => {
                    console.log('res', res)
                    return EMPTY.pipe(ignoreElements());
                }),
                catchError((err) => {
                    console.log(err)
                    return EMPTY.pipe(ignoreElements());
                })
            ).subscribe()
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

    // download stream
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