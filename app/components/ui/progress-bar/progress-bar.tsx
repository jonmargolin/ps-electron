import * as React from 'react';
import { IProgressBar } from './progress-bar.model';
const styles = require('./progress-bar.scss');

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