import * as React from 'react';
const styles = require('./progress-bar.scss');

export interface IProgressBar {
    progress: number;
}

export class ProgressBar extends React.Component<IProgressBar> {
    constructor(props: IProgressBar) {
        super(props);
    }

    render() {
        return (
            <div className={styles.empty}>
                <div className={styles.progress} style={{width: `${this.props.progress}%`}}></div>
            </div>
        );
    }
}

export default ProgressBar;