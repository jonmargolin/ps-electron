import * as React from 'react';
import ProgressBar from './ui/progress-bar/progress-bar';

let styles = require('./Counter.scss');

export interface IProps {
  reset(): void,
  counter: number
}

export class Counter extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  render() {
    return (
      <div className={`${styles.homeContainer}`} data-class="homeContainer">
          <div className={`${styles.counter}`} data-tid="counter">
            {this.props.counter}
          </div>
          <div className={styles.progressBar}>
            <ProgressBar progress={this.props.counter}/>
          </div>
      </div>
    );
  }
}

export default Counter;