import * as React from 'react';
const styles = require('./progress-bar.scss');

export enum ProgressText {
    Initializing = 'Initializing',
    FetchingFiles = 'Fetching Files...',
    Finalizing = 'Finalizing'
}

export interface IProgressBar {
    progress: number;
    progressText?: ProgressText;
    onDone: () => void;
}

export const ProgressBar = (props: IProgressBar) => {
        let progress = props.progress;

        if (props.progress > 100) {
            progress = 100;
            props.onDone();
        }

        return (
            <>
                <div className={styles.textContainer}>
                    <div className={styles.progressText}>{props.progressText}</div>
                </div>
                <div className={styles.empty}>
                    <div className={styles.progress} style={{width: `${progress}%`}}></div>
                </div>
            </>
        );
}

export default ProgressBar;