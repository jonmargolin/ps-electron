import * as React from "react";
import ProgressBar, { ProgressText } from '../../components/ui/progress-bar/progress-bar';
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
    filePaths:any;
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
        // download all the files from this.state.filePaths
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