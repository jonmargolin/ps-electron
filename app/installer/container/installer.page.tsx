import * as React from "react";
import { InstallerHelper } from '../installer.helper';
import { RouteComponentProps } from 'react-router';
import { IInstallerProps, IInstallerState } from '../models/installer.model';
import { Button, ProgressText, ProgressBar } from '../../components/ui/';

export class InstallerPage extends React.Component<RouteComponentProps<any> & IInstallerProps, IInstallerState> {
    helper = new InstallerHelper();
    constructor(readonly props: RouteComponentProps<any> & IInstallerProps) {
        super(props);
        this.state = {
            filePaths: props.filePaths,
            progress: 0,
            progressText: ProgressText.Initializing,
            isDone: false,
            error: null
        }
    }
    
    componentDidMount() {
        this.fetchFiles();
    }

    fetchFiles() {
        const filePaths = this.state.filePaths;
        if (!filePaths || filePaths.length === 0) return;
        this.setProgressText(ProgressText.FetchingFiles);

        // download all the files from filePaths
        this.helper.fetchFiles(filePaths).subscribe(
            res => console.log(`%c*** DONE DOWNLOADING FILE - ${res.name} ***`, 'font-size: 1.5em; color: green; font-weight: bold;'),
            (err) => {this.props.onError(err)},
            () => {
                this.setIsDone(true);
                console.log(`%c*** DONE DOWNLOADING ***`, 'font-size: 2em; color: gold; font-weight: bold;')
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

    // extract the files to correct folder
    // remove all temp files
    // validate installation and remove temp files
    // show button

    onNext = () => {
        this.props.history.push('');
        // navigate to finish page
    }

    onDone = () => {
        this.setIsDone(true);
    }

    render() {
        if (this.state.isDone)
            return (<Button clicked={this.onNext}>Done</Button>);
        else 
            return (
                <ProgressBar 
                    progress={this.state.progress} 
                    onDone={this.onDone} 
                    progressText={this.state.progressText} 
                />
            );
        
    }
}