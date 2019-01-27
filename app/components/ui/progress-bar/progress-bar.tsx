import * as React from 'react';
const styles = require('./progress-bar.scss');

export interface IProgressBar {
    progress: number;
}

export const ProgressBar = (props: IProgressBar) => {
        let progress = props.progress;

        if (props.progress > 100) {
            progress = 100;
        }

        return (
            <>
                <div className={styles.empty}>
                    <div className={styles.progress} style={{width: `${progress}%`}}></div>
                </div>
            </>
        );
}

export default ProgressBar;